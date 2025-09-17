import { motion } from 'framer-motion';
import React from 'react';

const Work = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL, featuring real-time inventory management.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/charlessmith/ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Data Pipeline Dashboard',
      description: 'A real-time monitoring dashboard for data pipelines using Apache Airflow and custom React components.',
      technologies: ['Python', 'Apache Airflow', 'React', 'D3.js', 'Docker'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/charlessmith/data-dashboard',
      featured: true
    },
    {
      id: 3,
      title: 'Financial Analytics Tool',
      description: 'Advanced financial data analysis platform with machine learning predictions and interactive visualizations.',
      technologies: ['Python', 'FastAPI', 'React', 'TensorFlow', 'Snowflake'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/charlessmith/fintech-tool',
      featured: false
    },
    {
      id: 4,
      title: 'Mobile Task Manager',
      description: 'Cross-platform mobile application for team task management with real-time collaboration features.',
      technologies: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
      image: '/api/placeholder/600/400',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/charlessmith/task-manager',
      featured: false
    }
  ];

  // Function to get company logo URL (supports both PNG and SVG)
  const getCompanyLogo = (company) => {
    const logos = {
      'HelloFresh': '/images/logos/hellofresh.svg',
      'Stonecrop Technologies': '/images/logos/stonecrop.png',
      'Professional Certifications': null, // No main logo for certifications
      'University of North Texas': '/images/logos/unt.png', // PNG format
      'University of Northern Colorado': '/images/logos/unc.svg'
    };
    return logos[company];
  };

  // Function to get certification logo based on role title
  const getCertificationLogo = (roleTitle) => {
    if (roleTitle.includes('PMP') || roleTitle.includes('Project Management Professional')) {
      return '/images/logos/pmi.png';
    }
    if (roleTitle.includes('Tableau')) {
      return '/images/logos/tableau.png';
    }
    if (roleTitle.includes('ASQ') || roleTitle.includes('Six Sigma')) {
      return '/images/logos/asq.png';
    }
    return '/images/logos/certifications.svg';
  };

  const timeline = [
    {
      year: '2021 - Present',
      company: 'HelloFresh',
      description: 'Progressive advancement from materials planning to leading business intelligence strategies for financial optimization.',
      type: 'work',
      roles: [
        {
          title: 'Manager, Business Intelligence (Finance)',
          period: 'Jan 2024 - Present',
          achievements: [
            'Developed ETL pipelines leveraging Python, SQL, Tableau, and Streamlit',
            'Created interactive dashboards integrating Amazon S3 for scalable data storage',
            'Automated financial reporting improving efficiency across departments',
            'Led data analysis and strategic initiatives delivering actionable insights'
          ]
        },
        {
          title: 'Senior Data Analyst (Finance)',
          period: 'April 2023 - January 2024',
          achievements: [
            'Utilized Python and SQL for strategic financial decision-making',
            'Developed complex financial models for forecasting and budgeting',
            'Created interactive Tableau dashboards for senior management'
          ]
        },
        {
          title: 'Senior Planner',
          period: 'April 2022 – April 2023',
          achievements: [
            'Led labor planning for 2000+ employees across multiple sites',
            'Implemented tool enhancements using Python, Google App Script, and SQL',
            'Managed short-term and long-term production forecasting'
          ]
        },
        {
          title: 'Planning & Materials Associate',
          period: 'May 2021 - April 2022',
          achievements: [
            'Developed shift plans aligned with production goals and SLAs',
            'Collaborated across HR, Operations, Logistics, and Procurement',
            'Maintained planning tools ensuring data accuracy in high-volume environment'
          ]
        }
      ]
    },
    {
      year: '2023',
      company: 'Professional Certifications',
      description: 'Achieved key professional certifications in project management and data analytics.',
      type: 'certification',
      roles: [
        {
          title: 'Project Management Professional (PMP)',
          period: 'Sep 2023',
          achievements: [
            'Project Management Institute - Credential ID: 3647825'
          ]
        },
        {
          title: 'Tableau Certified Data Analyst',
          period: 'Jul 2023',
          achievements: [
            'Tableau Certification for advanced data visualization and analytics'
          ]
        }
      ]
    },
    {
      year: '2022',
      company: 'Professional Certification',
      description: 'Advanced quality management certification.',
      type: 'certification',
      roles: [
        {
          title: 'ASQ Certified Six Sigma Green Belt',
          period: 'Aug 2022',
          achievements: [
            'American Society for Quality (ASQ) - Credential ID: 57961222'
          ]
        }
      ]
    },
    {
      year: '2015 - 2021',
      company: 'Stonecrop Technologies',
      description: 'Led strategic programs and inventory management across telecommunications industry.',
      type: 'work',
      roles: [
        {
          title: 'Project Manager',
          period: 'Feb 2019 - Feb 2021',
          achievements: [
            'Managed 500 orders/month in Nokia small cell program',
            'Achieved 99.8% inventory accuracy across facilities',
            'Oversaw disposition of $2.5M in assets with full compliance'
          ]
        },
        {
          title: 'Inventory Control Manager',
          period: 'Aug 2018 - Feb 2019',
          achievements: [
            'Optimized processes for inventory up to $900M in total value',
            'Developed reporting tools using Excel, Access, and Tableau',
            'Provided root cause analysis reducing inventory discrepancies'
          ]
        },
        {
          title: 'Reverse Logistics Supervisor',
          period: 'Nov 2016 - Aug 2018',
          achievements: [
            'Generated $2.5M in additional revenue through returns management',
            'Led Massive MIMO CDU30 Refurbishment projects',
            'Built vendor relationships streamlining material scrapping processes'
          ]
        },
        {
          title: 'Material Follow-Up Coordinator',
          period: 'Oct 2015 - Nov 2016',
          achievements: [
            'Monitored $300M worth of materials ensuring SLA compliance',
            'Led Highjump WMS implementation in distribution center',
            'Optimized material handling improving operational efficiency'
          ]
        }
      ]
    },
    {
      year: '2015 - 2017',
      company: 'University of North Texas',
      description: 'Advanced graduate studies in Recreation, Event, and Sport Management.',
      type: 'education',
      roles: [
        {
          title: 'M.Sc. in Recreation, Event, and Sport Management',
          period: '2015 - 2017',
          achievements: [
            'Denton, Texas'
          ]
        }
      ]
    },
    {
      year: '2010 - 2014',
      company: 'University of North Texas',
      description: 'Bachelor\'s degree foundation in Recreation, Event, and Sport Management.',
      type: 'education',
      roles: [
        {
          title: 'B.Sc. in Recreation, Event, and Sport Management',
          period: '2010 - 2014',
          achievements: [
            'Denton, Texas'
          ]
        }
      ]
    },
    {
      year: '2007 - 2010',
      company: 'University of Northern Colorado',
      description: 'Early education focus with NCAA Division 1 athletics.',
      type: 'education',
      roles: [
        {
          title: 'Physical Education K-12',
          period: '2007 - 2010',
          achievements: [
            'NCAA Division 1 Track & Field Team - Throws',
            'Greeley, Colorado'
          ]
        }
      ]
    }
  ];

  const handleResumeDownload = async () => {
    try {
      // Use fetch for binary data (PDF) instead of axios
      const response = await fetch('/api/resume/download');
      
      if (response.ok) {
        // Get the PDF blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Charlie_Smith_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Resume download error:', errorData);
        alert(`Error: ${errorData.message || 'Failed to download resume'}`);
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Sorry, there was an error downloading the resume. Please try again later.');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work':
        return '💼';
      case 'education':
        return '🎓';
      case 'achievement':
        return '🏆';
      case 'certification':
        return '📜';
      default:
        return '📅';
    }
  };

  return (
    <div className="min-h-screen bg-ivory-300">
      {/* Hero Section */}
      <section className="pt-20 pb-12 modern-gradient">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-noir-900 mb-6">
              My <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-noir-600 mb-6 font-medium leading-relaxed max-w-3xl mx-auto">
              Projects and professional milestones that showcase my passion for innovative solutions.
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                className="btn-primary"
              >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-noir-900 mb-2">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-noir-600 font-medium max-w-2xl mx-auto">
              Highlighting some of my most impactful projects
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="card group overflow-hidden"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-noir-900 mb-3 group-hover:text-moss-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-noir-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-moss-100 text-moss-700 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-moss-600 hover:text-moss-700 font-medium transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-noir-600 hover:text-noir-900 font-medium transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-noir-900 mb-2">Other Projects</h3>
            <p className="text-noir-600">Additional work showcasing diverse technical skills</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(project => !project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 group hover:shadow-xl transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-noir-900 mb-2 group-hover:text-moss-600 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-noir-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-neutral-100 text-noir-600 text-xs font-medium rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-neutral-100 text-noir-600 text-xs font-medium rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-sm">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moss-600 hover:text-moss-700 font-medium"
                  >
                    View Project
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-noir-600 hover:text-noir-900 font-medium"
                  >
                    Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-16 bg-ivory-200/30">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-noir-900 mb-2">
              Professional <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-lg md:text-xl text-noir-600 font-medium max-w-2xl mx-auto">
              My career journey through different companies and achievements
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-moss-200 transform md:-translate-x-0.5"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative mb-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-moss-500 rounded-full transform -translate-x-2 md:-translate-x-2 flex items-center justify-center z-10 mt-6">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div 
                    className={`card p-6 ml-16 md:ml-0 ${
                      index % 2 === 0 
                        ? '' 
                        : 'md:ml-auto'
                    }`}
                    style={{
                      width: '46%'
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{getTypeIcon(item.type)}</span>
                      <span className="text-moss-600 font-bold text-base">{item.year}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {getCompanyLogo(item.company) && (
                        <div className="w-20 h-20 mr-4 flex-shrink-0">
                          <img 
                            src={getCompanyLogo(item.company)}
                            alt={`${item.company} logo`}
                            className={`w-full h-full rounded-full border-2 border-moss-200 shadow-md bg-white ${
                              ['HelloFresh'].includes(item.company)
                                ? 'object-contain p-1' 
                                : 'object-cover p-0.5'
                            }`}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="w-full h-full bg-moss-100 rounded-full border-2 border-moss-200 shadow-md items-center justify-center text-moss-700 font-bold text-lg hidden"
                            style={{ display: 'none' }}
                          >
                            {item.company.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-noir-900">
                        {item.company}
                      </h3>
                    </div>
                    <p className="text-noir-600 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Roles within the company */}
                    {item.roles.length > 0 && (
                      <div className="space-y-6">
                        {item.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="border-l-2 border-moss-600 pl-4">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                              <div className="flex items-center">
                                {item.type === 'certification' && (
                                  <div className="w-8 h-8 mr-3 flex-shrink-0">
                                    <img 
                                      src={getCertificationLogo(role.title)}
                                      alt={`${role.title} logo`}
                                      className="w-full h-full object-contain rounded bg-white p-1 border border-moss-200 shadow-sm"
                                    />
                                  </div>
                                )}
                                <h4 className="text-lg font-bold text-noir-900">
                                  {role.title}
                                </h4>
                              </div>
                              <span className="text-moss-600 font-medium text-xs">
                                {role.period}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {role.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <div className="w-1.5 h-1.5 bg-moss-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                  <span className="text-noir-600 text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;