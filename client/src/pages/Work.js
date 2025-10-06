import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createTimelineFromResume, parseCertificates, parseEducation, parseExperience } from '../utils/resumeParser';

const Work = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const [resumeDownloading, setResumeDownloading] = useState(false);

  // Load resume data on component mount
  useEffect(() => {
    const loadResumeData = async () => {
      try {
        // Use relative URLs so API calls go through the same domain/protocol
        // This avoids mixed content issues and uses the nginx proxy configuration
        
        // Fetch all resume data in parallel
        const [experienceResponse, certificatesResponse, educationResponse] = await Promise.all([
          fetch('/api/resume-experience'),
          fetch('/api/resume-certificates'),
          fetch('/api/resume-education')
        ]);
        
        let experienceEntries = [];
        let certificates = [];
        let education = [];
        
        // Parse experience data
        if (experienceResponse.ok) {
          const experienceResult = await experienceResponse.json();
          console.log('Experience API response:', experienceResult);
          setDebugInfo(prev => prev + `Experience API: ${experienceResult.success ? 'OK' : 'FAIL'}\n`);
          if (experienceResult.success) {
            experienceEntries = parseExperience(experienceResult.data);
            console.log('Parsed experience entries:', experienceEntries);
            setDebugInfo(prev => prev + `Parsed ${experienceEntries.length} experience entries\n`);
          }
        }
        
        // Parse certificates data
        if (certificatesResponse.ok) {
          const certificatesResult = await certificatesResponse.json();
          console.log('Certificates API response:', certificatesResult);
          if (certificatesResult.success) {
            certificates = parseCertificates(certificatesResult.data);
            console.log('Parsed certificates:', certificates);
          }
        }
        
        // Parse education data
        if (educationResponse.ok) {
          const educationResult = await educationResponse.json();
          console.log('Education API response:', educationResult);
          if (educationResult.success) {
            education = parseEducation(educationResult.data);
            console.log('Parsed education:', education);
          }
        }
        
        // Create timeline from all parsed data
        const resumeTimeline = createTimelineFromResume(experienceEntries, certificates, education);
        console.log('Final timeline:', resumeTimeline);
        setDebugInfo(prev => prev + `Created timeline with ${resumeTimeline.length} items\n`);
        
        // Temporary fallback timeline for debugging
        if (resumeTimeline.length === 0) {
          console.log('Timeline is empty, using fallback');
          setDebugInfo(prev => prev + 'Using fallback timeline\n');
          setTimeline([
            {
              year: "2024 - Present",
              company: "HelloFresh",
              description: "Leading business intelligence initiatives and data-driven decision making.",
              type: "work",
              roles: [
                {
                  title: "Manager, Business Intelligence (Finance)",
                  period: "Jan 2024 - Present",
                  achievements: ["Developed BI strategies", "Created ETL pipelines", "Built interactive dashboards"]
                }
              ]
            },
            {
              year: "2019 - 2021", 
              company: "Stonecrop Technologies",
              description: "Project management and inventory control expertise.",
              type: "work",
              roles: [
                {
                  title: "Project Manager",
                  period: "Feb. 2019 - Feb. 2021",
                  achievements: ["Led Nokia small cell program", "Achieved 99.8% inventory accuracy", "Managed $2.5M in assets"]
                }
              ]
            }
          ]);
        } else {
          setDebugInfo(prev => prev + 'Using parsed timeline\n');
          setTimeline(resumeTimeline);
        }
        
      } catch (error) {
        console.error('Error loading resume data:', error);
        // Fallback to empty timeline
        setTimeline([]);
      } finally {
        setLoading(false);
      }
    };

    loadResumeData();
  }, []);
  // Projects data - temporarily commented out during maintenance
  // const projects = [
  //   {
  //     id: 1,
  //     title: 'E-commerce Platform',
  //     description: 'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL, featuring real-time inventory management.',
  //     technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
  //     image: '/api/placeholder/600/400',
  //     liveUrl: 'https://example.com',
  //     githubUrl: 'https://github.com/csmith1133/ecommerce',
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Data Pipeline Dashboard',
  //     description: 'A real-time monitoring dashboard for data pipelines using Apache Airflow and custom React components.',
  //     technologies: ['Python', 'Apache Airflow', 'React', 'D3.js', 'Docker'],
  //     image: '/api/placeholder/600/400',
  //     liveUrl: 'https://example.com',
  //     githubUrl: 'https://github.com/csmith1133/data-dashboard',
  //     featured: true
  //   },
  //   {
  //     id: 3,
  //     title: 'Financial Analytics Tool',
  //     description: 'Advanced financial data analysis platform with machine learning predictions and interactive visualizations.',
  //     technologies: ['Python', 'FastAPI', 'React', 'TensorFlow', 'Snowflake'],
  //     image: '/api/placeholder/600/400',
  //     liveUrl: 'https://example.com',
  //     githubUrl: 'https://github.com/csmith1133/fintech-tool',
  //     featured: false
  //   },
  //   {
  //     id: 4,
  //     title: 'Mobile Task Manager',
  //     description: 'Cross-platform mobile application for team task management with real-time collaboration features.',
  //     technologies: ['React Native', 'Firebase', 'Node.js', 'Socket.io'],
  //     image: '/api/placeholder/600/400',
  //     liveUrl: 'https://example.com',
  //     githubUrl: 'https://github.com/csmith1133/task-manager',
  //     featured: false
  //   }
  // ];

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

  // Timeline is now loaded dynamically from resume data in useEffect above


  const handleResumeDownload = async () => {
    setResumeDownloading(true);
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
        const errorMessage = errorData.details 
          ? `Error: ${errorData.message}\n\nDetails: ${errorData.details}`
          : `Error: ${errorData.message || 'Failed to download resume'}`;
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Sorry, there was an error downloading the resume. Please try again later.');
    } finally {
      setResumeDownloading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'work':
        return (
          <svg className="w-7 h-7 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-7 h-7 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-7 h-7 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'certification':
        return (
          <svg className="w-7 h-7 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-7 h-7 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-8 0h8m-8 0H3a2 2 0 00-2 2v6a2 2 0 002 2h4m4-6v6m0-6V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-ivory-300">
      {/* Hero Section */}
      <section className="pb-12 modern-gradient">
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
                whileHover={!resumeDownloading ? { scale: 1.05 } : {}}
                whileTap={!resumeDownloading ? { scale: 0.95 } : {}}
                onClick={handleResumeDownload}
                disabled={resumeDownloading}
                className={`btn-primary ${resumeDownloading ? 'opacity-75 cursor-wait' : ''}`}
              >
                {resumeDownloading ? (
                  <>
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-10">
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

          {/* Under Construction Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="max-w-4xl mx-auto">
              {/* Construction Animation */}
              <div className="relative bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-2xl p-12 border-2 border-dashed border-moss-300 overflow-hidden">
                {/* Animated construction elements */}
                <div className="absolute top-4 right-4 animate-bounce">
                  <svg className="w-8 h-8 text-moss-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                
                <div className="absolute bottom-4 left-4 animate-pulse">
                  <svg className="w-6 h-6 text-moss-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>

                <div className="text-center relative z-10">
                  {/* Main Icon */}
                  <div className="mb-8">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 bg-gradient-to-br from-moss-400 to-moss-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 w-20 h-20 bg-moss-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-noir-900 mb-4">
                    Portfolio Under Construction
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg text-noir-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    I'm currently curating and building out my project portfolio with detailed case studies, 
                    technical implementations, and measurable business outcomes. This section will showcase 
                    my most impactful work across data analytics, business intelligence, and strategic initiatives.
                  </p>

                  {/* Feature Preview Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-moss-200">
                      <div className="w-8 h-8 bg-moss-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <svg className="w-4 h-4 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-noir-900 mb-1">Data Dashboards</h4>
                      <p className="text-sm text-noir-600">Interactive BI solutions</p>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-moss-200">
                      <div className="w-8 h-8 bg-moss-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <svg className="w-4 h-4 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-noir-900 mb-1">Automation</h4>
                      <p className="text-sm text-noir-600">Process optimization</p>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-moss-200">
                      <div className="w-8 h-8 bg-moss-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                        <svg className="w-4 h-4 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-noir-900 mb-1">Strategy</h4>
                      <p className="text-sm text-noir-600">Business initiatives</p>
                    </div>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="inline-flex items-center bg-gradient-to-r from-moss-500 to-moss-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section className="py-10 bg-ivory-200/30">
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
              <div className="absolute left-1 md:left-1/2 top-0 bottom-0 w-0.5 bg-moss-200 transform md:-translate-x-0.5"></div>

              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center py-12"
                >
                  <div className="text-lg text-noir-600">Loading work experience from resume...</div>
                </motion.div>
              ) : timeline.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-12"
                >
                  <div className="text-lg text-noir-600 mb-4">
                    No timeline data found. Timeline length: {timeline.length}
                  </div>
                  <div className="text-sm text-noir-500 bg-gray-100 p-4 rounded max-w-2xl">
                    <strong>Debug Info:</strong>
                    <pre>{debugInfo}</pre>
                  </div>
                </motion.div>
              ) : (
                timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative mb-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1 md:left-1/2 w-4 h-4 bg-moss-500 rounded-full transform -translate-x-2 md:-translate-x-2 flex items-center justify-center z-10 mt-6">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div 
                    className={`card p-6 ml-6 md:ml-0 w-full md:w-[46%] ${
                      index % 2 === 0 
                        ? '' 
                        : 'md:ml-auto'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="mr-3">{getTypeIcon(item.type)}</div>
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
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;