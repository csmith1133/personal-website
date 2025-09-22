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
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAIABJREFUeJzs3Xd8FNeVB/4zt7eptRJNSKiAEE1UUwysYJqRHGPH2HF2ncRJnJJNc9Im+e0maXaTzSabnTjr1GydON64xBW349g4xjbu7YMxRk1CjSSE0Kop/QAAAAlLSURBVAraTNt9vz/OjEaj0Wik6dnn7YmPx8fHPnPmTBmd++bOzOp3773nnrtueff5y3sSE5P//e//+e//9V/5vz/9+C//8R//8R//8R//8R//8R//8R//8R//8R//8R/3vD9evnT+H//fvP7Xm/UlP/v99lP8/XfHv/6f//d/55z6yfBfT1N99T/5y/+7v+e//4r/m4/z3/4X/2t8/af/8R5+z3/9e/8b5/z0v7EH/7bXP9C8/qf/3D/z+/mP6z9zrPP2//8/7lf7P/9v88/6z/31+Rd5fefBj/t5//V8/4r/Tf+iJ+Xv/dv8vfOPvp73vfz3Nf9hf7l/O1/53v/N3+f3/vf+c2P+Tf/Sf9n/9/z3/ztPz2v/g/z8v8X/z9/n3/M+S///H//H/v/8s/5t/9f/wf+Tf5v/+3+5f/n/nP/Bj/A/+P3/4D/Mf/Av8vP+6/8Pf/eP/f/Mc/6JNDHPv59//mf+K//4v+Dv9Gf+1z+jH/v7j/n/kD/rn/P/9Lfw5/+w/+7f5L/+n9Qf/wf/L/3u/w7X8f/rv9rv8I/9f/5z/5j/7f+Yf+g/8t/7D/6f+R//f/qJ/z7/0/+O/+B/68/9N/5H/2j/kv/A/8f/s//lv+jf/rP+NJ/jz/gz/3F/yl/+c/8hf86//6f8Z/52/+7/9m/zH/qL/8d/m3/rX+8X/n3+8f96/9j/6F/3j/9V/9V//L8/Tf9vf4v/xP+Kf9v/z//sM/xEX/z//8f/zT//D/7+/zL/6r/nf+Nv83/9Df4j/t3/6/9K/7Z/8x/+y/5l/4R/xD/g//5f8y/6lz+d/9t/6t/47/n3/+z/6ykJI8IDw/3qzew4M8K62FBQgCMshs2bOjQvXv3zwMCAgyZmZnKsHbZMGpj5cXYKtpCsK1ZCuC+77//fmrLli0hugV4AgrU58KFC+FVqlSZgBAahDEGhVImANaNBFBxRsHecTQiImJMSkrKz/4EghBSJgv/sRhzb1JOE90fL4fa07Md1sefn332WdNevXrd0+Nh9+7dKxsSEjIeIfQ6TceiUVQSR4v8CKfRWXkkJ9jPBKPRyFkslttbt26d06FDByhlzD4MgSKLADMAFNmpZQNjCOiLADAsv/LKKwO++uorOBhli7lmAcvTIe5Frh+E9Jtk8kE6aqj3DlEJ8L9SH3net2Z5iKDfh+Pixs+eNGkqsLSzUG19l0m+tAZ5/1lzCQrACNoBx8gPp/3ytBZp1RBlGKpyrclC6s0NGza06Nq163kWRZIv088eqhIBQshDISEh8+/fv9/OaDQanJVac2xK4U03h4aGLrt58+ackJCQGyof6ZfLqlat8cqFC+fjOI6rLghWuzdX+XAV77qrvsqGbYn5n3qr3z99+nRcnTp14G9++YBRo2vXru02bty4gaY3OB2nF51xSpSriHx4jBAC3n+fz8q0tLQyoaGhEziMB4NhScwu7exFt3W7xW5sMJlMoiWrzNTs2bNnvP3228CxwD4MgSKLADMAFNmpZQNjCOiHACEkqn79+q/98ccfbyKEynIcB6Rnqgn+nAiV0p+UYX5qBTSH62ThhZZlyin79GM/2GnuYJLBYFicmHhlVWRk2atMWdNvfeRnS4SQYoGBgRMzMzO7YowrUKOPTh5+O3mkotyfVEkAfkAAv9+pU6fnNm3a9LseAnJ+4sieXfQRMJvNj5tMpi0Y49KQY+2pFKbMjK5g1E/BGMdPmTJl5fjx49f5s/Sdq9mBqDSM+bkIkb4IEeD9AOMfnC3SWeDqXFF53kgGP/nZPM8jQRC2xMTExF28ePGkP1eMbZy4L8Z4ETVEeJw/tf2jHA/yODMoLwTglxYXF1c8Li7OZ0NHSkpKZEREBJQJfovDuJTEXaC2g3l8nbwW6PyaBw8ePHPZsmVQTYJ9GAJFFgFmACiyU8sGxhDQBwFCSNkyZcoMvXXrVm9RFIvLBHqUPd9rI4CydyqFMekWF9dKOYRQ0cdWEUlKVTRQxR9C/O9VrFjxjcuXL+/KKg13V49cRn3QZa34ggAwf1esWHHitWvX+oJhCoRKW1Unaf41R6fIfXGIQlEqAcCKDkoGfBJCQ0On3L17FwgHfRaQfcGB3csQ8IQAKMQffPBBx0GDBq3nOCnvWqqO4ek++j3sr8ClAeR39zFC12vUrLn+r7/+WpDf5S5feqlro02bNq5AiED9eHsag7txaTlvlGcOVRBnnDx5ckaDBg10CYlXiT9at25dtdjY2BkY45d0THHIYeBw4DtIgIgqQshGX43ld+7ciYosUaIXEoTBWaS71aR9GmMEBK1aPlrnLXfbssqTO9UAjF0cxxkEQTD37Nlz7tq1a9/V0jd2LUOgsCHADABFbcZYfxkCeYiAc+fOle/bb79iiqI0pIS2ZZSCQWo01NeqpAAohBAhBDJSSokA/TlnTdO+aJrmBVFOVA4bnJLVaLQ8YLVYn7RarQ8pCMpDilJRVdUkSZKokiSpBQIEQRBZloOCi4oKKkFBQUGVFUVqL1fZ28ZSCSVU/fqp066uvnQrGe3HDf7j2bbbrDaYvjWLOFZWPLqO8UHhLPsNlAiWsJa5V9PqWGo4g6R9FBIfZs8IAVJqDO4fJLXN6FJSSFo4SkKe9+tVTdNZ3VYZ+Xe/8xbx1Ebd7+/VarW+jqBP0qCr3SXqp+iXz/b54lhxaWUqR/YgYGDRaBYJzYnxjgdK1R0sJI8XHr8VCtgD2cFI5bXYoJajkSaZ1LpOD2cAgQQCcCFnSF3KYU6+Ggdow+eHbtqrLrfQnqYFKGbBnKCOl1rZhLRKlOZgVYBABOj5YvjR0fBNrOFFGm0oqh9p1HrmKH8vn0PqO1kdkYtGiT1XnV6/r9lPPmjR05GKD4P7OA+UQRAj5LqAjMWYEFJESvRCzNMKrUh6xT6AJE0Jmr5/iX9O+IogI7rCqwgSwdEhCoF6xqZfKi81Y9VAb5GFqKJKcNGJNIGMBBz05Kyr9NJPkT3fgBXEJOTQPYhPCfVE6Axt2YZhYkZyIe1RJBEA1k3jZTuWLsG9LJASUGh78JNCC8oUFLzAJ4mKLkGASLcOu3YQpAgR5vx8fz7+L68YfVHWMYeNrw5AROdz1V7SJeGME1o3qpJLItAKI7YFAdDBQqBwuRSaF1C8JAGiBAEilJCbeFJQC7FcZGkTEAChQiVoARTfDAL6rKzP8RKE2YVCFNK/fUaAPpzqn9gQQiVJpE9aTFk6vPJTYKpkBcOvh8HqvuJ9s/oM0lGLqZKF/Kf95F4MjRNGRSTSmT3H/8LV8mQaYKG9sP7PSz7qNPt30gE8+/fv77Nz5079e/z3d+9/PG16//vvv+fnueOlX/8eV8KE4l4JLCCFrAFfCgvkDQW1tOgzaKGVdLrM13/W/8sOgdO6GGNA8QQqnAJf/n+4t+kREZFOqJDqNK6AEQJ0fD2AAAAAAElFTkSuQmCC" 
                       alt="Charlie Smith" 
                       style="height: 60px; width: auto; margin-bottom: 16px; display: block; margin-left: auto; margin-right: auto;"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                  <div style="display: none; font-family: 'Dancing Script', 'Brush Script MT', cursive; font-size: 48px; font-weight: 700; color: #EB5E28; margin-bottom: 16px; text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
                    Charlie Smith
                  </div>
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
