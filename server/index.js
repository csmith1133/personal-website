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

// Contact form rate limiting - increased for development/testing
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // increased from 5 to 20 for testing
  message: 'Too many contact form submissions, please try again later.'
});

// Email transporter setup using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
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
    body('name').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().escape(),
    body('message').trim().escape()
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
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Contact</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              .gradient-bg {
                background: linear-gradient(135deg, #FFFCF2 0%, #E4E4DE 100%);
              }
              .glass-effect {
                background: rgba(255, 252, 242, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #FFFCF2 0%, #CCC5B9 100%); font-family: 'Inter', Arial, sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              
              <!-- Header with Logo -->
              <div style="text-align: center; margin-bottom: 32px; padding: 24px;">
                <div style="text-align: center;">
                  <img src="https://iili.io/Ka8ILtS.md.png" 
                       alt="Power BI Logo" 
                       style="width: 300px; height: 200px; object-fit: cover; object-position: center; margin-bottom: 0px; display: block; margin-left: auto; margin-right: auto;"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                </div>
                <div style="height: 2px; width: 60px; background: linear-gradient(90deg, #EB5E28, #FF7043); margin: 0 auto; border-radius: 2px;"></div>
                <p style="color: #403D39; font-size: 14px; margin: 16px 0 0 0; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                  New Contact Form Submission
                </p>
              </div>

              <!-- Main Content Card -->
              <div style="background: rgba(255, 252, 242, 0.95); backdrop-filter: blur(10px); border-radius: 24px; padding: 0; margin-bottom: 24px; box-shadow: 0 20px 40px rgba(37, 36, 34, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2); overflow: hidden;">
                
                <!-- Contact Info Header -->
                <div style="background: linear-gradient(135deg, #CCC5B9, #E4E4DE); padding: 32px 32px 24px 32px;">
                  <h2 style="color: #252422; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; letter-spacing: -0.01em;">
                    Contact Details
                  </h2>
                  <div style="display: grid; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 16px; padding: 12px 0;">
                      <div style="width: 6px; height: 6px; background: #EB5E28; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(235, 94, 40, 0.2);"></div>
                      <span style="color: #252422; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; min-width: 60px;">Name</span>
                      <span style="color: #403D39; font-weight: 500; font-size: 16px;">${name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; padding: 12px 0;">
                      <div style="width: 6px; height: 6px; background: #EB5E28; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(235, 94, 40, 0.2);"></div>
                      <span style="color: #252422; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; min-width: 60px;">Email</span>
                      <span style="color: #403D39; font-weight: 500; font-size: 16px;">${email}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px; padding: 12px 0;">
                      <div style="width: 6px; height: 6px; background: #EB5E28; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(235, 94, 40, 0.2);"></div>
                      <span style="color: #252422; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; min-width: 60px;">Subject</span>
                      <span style="color: #403D39; font-weight: 500; font-size: 16px;">${subject}</span>
                    </div>
                  </div>
                </div>

                <!-- Message Content -->
                <div style="padding: 32px; background: rgba(255, 252, 242, 1);">
                  <div style="border-left: 3px solid #EB5E28; padding-left: 20px; margin-bottom: 4px;">
                    <h3 style="color: #252422; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; letter-spacing: -0.01em; text-transform: uppercase; font-size: 12px; letter-spacing: 0.8px;">
                      Message
                    </h3>
                  </div>
                  <div style="color: #403D39; font-size: 16px; line-height: 1.7; font-weight: 400; white-space: pre-wrap; padding: 20px; background: #FFFCF2; border-radius: 12px; border: 1px solid rgba(235, 94, 40, 0.1);">
                    ${message}
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 20px; background: rgba(255, 252, 242, 0.8); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px;">
                  <div style="width: 8px; height: 8px; background: #EB5E28; border-radius: 50%;"></div>
                  <span style="color: #403D39; font-size: 13px; font-weight: 500;">Portfolio Contact Form</span>
                  <div style="width: 8px; height: 8px; background: #EB5E28; border-radius: 50%;"></div>
                </div>
                <p style="color: #595f39; font-size: 11px; margin: 0; font-weight: 400; opacity: 0.8;">
                  ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Chicago'
                  })} CST
                </p>
              </div>

            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      
      res.json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } catch (error) {
      console.error('🚨 EMAIL SENDING FAILED:', error);
      console.error('📧 SMTP Error Details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        stack: error.stack?.split('\n').slice(0, 3)
      });
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
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
    const resumePath = path.join(__dirname, 'resume');
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
    const experiencePath = path.join(__dirname, 'resume/resume/experience.tex');
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

app.get('/api/resume-experience', async (req, res) => {
  try {
    const experiencePath = path.join(__dirname, 'resume/resume/experience.tex');
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
    const skillsPath = path.join(__dirname, 'resume/resume/skills.tex');
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
    const certificatesPath = path.join(__dirname, 'resume/resume/certificates.tex');
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
    const educationPath = path.join(__dirname, 'resume/resume/education.tex');
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
