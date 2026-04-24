import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { createTimelineFromResume, parseCertificates, parseEducation, parseExperience } from '../utils/resumeParser';

const Work = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResumeData = async () => {
      try {
        const [experienceResponse, certificatesResponse, educationResponse] = await Promise.all([
          fetch('/api/resume-experience'),
          fetch('/api/resume-certificates'),
          fetch('/api/resume-education'),
        ]);

        let experienceEntries = [];
        let certificates = [];
        let education = [];

        if (experienceResponse.ok) {
          const experienceResult = await experienceResponse.json();
          if (experienceResult.success) experienceEntries = parseExperience(experienceResult.data);
        }
        if (certificatesResponse.ok) {
          const certificatesResult = await certificatesResponse.json();
          if (certificatesResult.success) certificates = parseCertificates(certificatesResult.data);
        }
        if (educationResponse.ok) {
          const educationResult = await educationResponse.json();
          if (educationResult.success) education = parseEducation(educationResult.data);
        }

        setTimeline(createTimelineFromResume(experienceEntries, certificates, education));
      } catch (error) {
        console.error('Error loading resume data:', error);
        setTimeline([]);
      } finally {
        setLoading(false);
      }
    };
    loadResumeData();
  }, []);

  const getCompanyLogo = (company) => {
    const logos = {
      HelloFresh: '/images/logos/hellofresh.svg',
      'Stonecrop Technologies': '/images/logos/stonecrop.png',
      'Professional Certifications': null,
      'University of North Texas': '/images/logos/unt.png',
      'University of Northern Colorado': '/images/logos/unc.svg',
    };
    return logos[company];
  };

  const getCertificationLogo = (roleTitle) => {
    if (roleTitle.includes('PMP') || roleTitle.includes('Project Management Professional')) return '/images/logos/pmi.png';
    if (roleTitle.includes('Tableau')) return '/images/logos/tableau.png';
    if (roleTitle.includes('ASQ') || roleTitle.includes('Six Sigma')) return '/images/logos/asq.png';
    return '/images/logos/certifications.svg';
  };

  const handleResumeDownload = async () => {
    try {
      const response = await fetch('/api/resume/download');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Charlie_Smith_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to download resume'}`);
      }
    } catch (error) {
      alert('Sorry, there was an error downloading the resume. Please try again later.');
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'work': return { label: 'EXPERIENCE', bg: 'bg-unt-green', text: 'text-white' };
      case 'education': return { label: 'EDUCATION', bg: 'bg-unt-lime', text: 'text-unt-dark' };
      case 'certification': return { label: 'CERTIFICATION', bg: 'bg-unt-green/10', text: 'text-unt-green' };
      default: return { label: '', bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="modern-container pb-16 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-unt-green font-medium tracking-wider"
        >
          PORTFOLIO
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-6xl md:text-7xl lg:text-8xl text-unt-green mt-4 mb-6"
        >
          MY WORK
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Professional milestones that showcase my passion for innovative, data-driven solutions.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResumeDownload}
          className="btn-primary inline-flex"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </motion.button>
      </section>

      {/* Timeline */}
      <section className="bg-unt-green relative py-24">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#00853E" />
          </svg>
        </div>

        <div className="modern-container relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-mono text-sm text-unt-lime font-medium tracking-wider">JOURNEY</span>
              <h2 className="font-display text-5xl md:text-6xl text-white mt-3">PROFESSIONAL TIMELINE</h2>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-8 h-8 border-2 border-white/20 border-t-unt-lime rounded-full animate-spin mb-4" />
              <p className="text-white/50 font-mono text-sm">Loading from resume...</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {timeline.map((item, index) => {
                const badge = getTypeBadge(item.type);
                return (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="bg-white rounded-2xl p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-5">
                        <div className="flex items-center gap-4 flex-1">
                          {getCompanyLogo(item.company) && (
                            <img
                              src={getCompanyLogo(item.company)}
                              alt={`${item.company} logo`}
                              className={`w-12 h-12 rounded-xl border border-gray-100 bg-white ${
                                ['HelloFresh'].includes(item.company) ? 'object-contain p-1' : 'object-cover p-0.5'
                              }`}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          )}
                          <div>
                            <h3 className="font-display text-2xl text-unt-green">{item.company.toUpperCase()}</h3>
                            <span className="font-mono text-xs text-gray-400">{item.year}</span>
                          </div>
                        </div>
                        <span className={`${badge.bg} ${badge.text} text-xs font-mono font-medium tracking-wider px-3 py-1 rounded-full self-start`}>
                          {badge.label}
                        </span>
                      </div>

                      <p className="text-gray-500 text-sm mb-5 leading-relaxed">{item.description}</p>

                      {item.roles.length > 0 && (
                        <div className="space-y-4">
                          {item.roles.map((role, roleIndex) => (
                            <div key={roleIndex} className="border-l-3 border-l-unt-green/20 pl-4 hover:border-l-unt-green transition-colors duration-300" style={{ borderLeftWidth: '3px' }}>
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {item.type === 'certification' && (
                                    <img
                                      src={getCertificationLogo(role.title)}
                                      alt={`${role.title} logo`}
                                      className="w-6 h-6 object-contain rounded bg-white p-0.5 border border-gray-100"
                                    />
                                  )}
                                  <h4 className="text-sm font-semibold text-gray-800">{role.title}</h4>
                                </div>
                                <span className="text-unt-green/60 font-mono text-xs mt-1 lg:mt-0">{role.period}</span>
                              </div>
                              <ul className="space-y-1">
                                {role.achievements.map((achievement, achIndex) => (
                                  <li key={achIndex} className="flex items-start">
                                    <div className="w-1.5 h-1.5 bg-unt-lime rounded-full mr-3 mt-1.5 flex-shrink-0" />
                                    <span className="text-gray-500 text-sm">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,0 L0,80 L1440,80 Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Work;
