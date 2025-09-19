const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy setting for rate limiting
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Contact form rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: 'Too many contact form submissions, please try again later.'
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', 
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 100 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 5, max: 200 }).escape(),
    body('message').trim().isLength({ min: 10, max: 1000 }).escape()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { name, email, subject, message } = req.body;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #fff; padding: 20px; border-left: 4px solid #4f46e5;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #555;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);

      res.json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  }
);

// Get projects data (can be expanded to use a database)
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: "FinOps Analytics Platform",
      description: "Advanced financial operations analytics platform built with Python, Streamlit, and Snowflake for real-time cost optimization and budget tracking.",
      technologies: ["Python", "Streamlit", "Snowflake", "Docker", "Kubernetes"],
      github: "https://github.com/charles-smith/na-finops",
      live: null,
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "Data Pipeline Automation",
      description: "Automated data processing pipeline using Apache Airflow for ETL operations with comprehensive monitoring and alerting.",
      technologies: ["Apache Airflow", "Python", "Docker", "PostgreSQL"],
      github: "https://github.com/charles-smith/airflow-community",
      live: null,
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 3,
      title: "Oracle BICC Integration",
      description: "Enterprise data integration solution for Oracle Business Intelligence Cloud Connector with automated schema management.",
      technologies: ["Python", "Oracle", "Spark", "Docker"],
      github: "https://github.com/charles-smith/gbi-oracle-bicc",
      live: null,
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  res.json(projects);
});

// Placeholder image endpoint
app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  res.redirect(`https://via.placeholder.com/${width}x${height}/4f46e5/ffffff?text=Project+Image`);
});

// Resume download endpoint with LaTeX compilation
app.get('/api/resume/download', async (req, res) => {
  try {
    const resumePath = path.join(__dirname, '..', 'resume');
    const outputPath = path.join(resumePath, 'output');
    
    // Ensure output directory exists
    await fs.ensureDir(outputPath);
    
    // Compile LaTeX to PDF
    const compileCommand = `cd "${resumePath}" && xelatex -output-directory="${outputPath}" resume.tex`;
    
    exec(compileCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error('LaTeX compilation error:', error);
        return res.status(500).json({
          success: false,
          message: 'Failed to generate resume PDF',
          error: 'LaTeX compilation failed'
        });
      }
      
      const pdfPath = path.join(outputPath, 'resume.pdf');
      
      // Check if PDF was generated
      if (await fs.pathExists(pdfPath)) {
        // Set headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Charlie_Smith_Resume.pdf"');
        
        // Stream the PDF file
        const pdfStream = fs.createReadStream(pdfPath);
        pdfStream.pipe(res);
      } else {
        res.status(500).json({
          success: false,
          message: 'PDF generation failed',
          error: 'Output file not found'
        });
      }
    });
    
  } catch (error) {
    console.error('Resume generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during resume generation'
    });
  }
});

// Serve static resume file (if you have a pre-built one)
app.get('/resume.pdf', (req, res) => {
  // This would serve a static resume file
  // res.sendFile(path.join(__dirname, 'public', 'resume.pdf'));
  res.status(404).json({ 
    message: 'Resume file not found. Use /api/resume/download for dynamic generation.' 
  });
});

// Skills data endpoint
app.get('/api/skills', (req, res) => {
  const skills = {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "SQL", "Bash"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    "Backend": ["Node.js", "Express", "FastAPI", "Flask"],
    "Databases": ["PostgreSQL", "Snowflake", "Oracle", "MongoDB"],
    "Cloud & DevOps": ["Docker", "Kubernetes", "AWS", "Terraform", "Airflow"],
    "Data & Analytics": ["Pandas", "NumPy", "Streamlit", "DBT", "Apache Spark"]
  };

  res.json(skills);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Resume data endpoints
app.get('/api/resume-experience', async (req, res) => {
  try {
    const experiencePath = path.join(__dirname, '../resume/resume/experience.tex');
    const experienceText = fs.readFileSync(experiencePath, 'utf8');
    
    res.json({
      success: true,
      data: experienceText
    });
  } catch (error) {
    console.error('Error reading experience file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read experience data'
    });
  }
});

app.get('/api/resume-skills', async (req, res) => {
  try {
    const skillsPath = path.join(__dirname, '../resume/resume/skills.tex');
    const skillsText = fs.readFileSync(skillsPath, 'utf8');
    
    res.json({
      success: true,
      data: skillsText
    });
  } catch (error) {
    console.error('Error reading skills file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read skills data'
    });
  }
});

app.get('/api/resume-certificates', async (req, res) => {
  try {
    const certificatesPath = path.join(__dirname, '../resume/resume/certificates.tex');
    const certificatesText = fs.readFileSync(certificatesPath, 'utf8');
    
    res.json({
      success: true,
      data: certificatesText
    });
  } catch (error) {
    console.error('Error reading certificates file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read certificates data'
    });
  }
});

app.get('/api/resume-education', async (req, res) => {
  try {
    const educationPath = path.join(__dirname, '../resume/resume/education.tex');
    const educationText = fs.readFileSync(educationPath, 'utf8');
    
    res.json({
      success: true,
      data: educationText
    });
  } catch (error) {
    console.error('Error reading education file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to read education data'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
