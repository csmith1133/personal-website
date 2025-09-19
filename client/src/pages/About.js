import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { parseSkills } from '../utils/resumeParser';

const About = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load skills from resume
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch('/api/resume-skills');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const parsedSkills = parseSkills(result.data);
            setSkills(parsedSkills);
          }
        }
      } catch (error) {
        console.error('Error loading skills from resume:', error);
        // Fallback to empty array
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Keep original skills as fallback (can be removed later)
  const fallbackSkills = [
    {
      category: 'Data Analysis & BI',
      technologies: ['Tableau', 'Power BI', 'Snowflake', 'ETL Pipelines', 'Data Automation', 'Financial Modeling', 'AI Integration']
    },
    {
      category: 'Finance & Process Optimization',
      technologies: ['Cost Analysis', 'Budgeting & Forecasting', 'Business Strategy', 'Financial Reporting']
    },
    {
      category: 'Project & Operations Management',
      technologies: ['Project Management (PMP)', 'Six Sigma (CSSGB)', 'Logistics', 'Inventory Control']
    },
    {
      category: 'Programming & Scripting',
      technologies: ['SQL', 'Python', 'JavaScript', 'HTML', 'CSS', 'Git']
    },
    {
      category: 'Tools & Collaboration',
      technologies: ['Jira', 'MS Office', 'Google Drive', 'Streamlit', 'Monday.com', 'Slack']
    }
  ];

  const stats = [
    { number: '25+', label: 'Projects Delivered' },
    { number: '5+', label: 'Years Experience' },
    { number: '95%', label: 'On-Time Delivery' },
    { number: '$500K+', label: 'Cost Savings Achieved' }
  ];

  return (
    <div className="min-h-screen bg-ivory-300">
      {/* Hero Section */}
      <section className="pb-16 modern-gradient">
        <div className="modern-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-noir-900 mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-lg md:text-xl text-noir-600 mb-6 leading-relaxed">
                I'm a dedicated Project Manager and Business Intelligence Leader with over 5 years of experience 
                combining strategic leadership with deep technical expertise. I specialize in SQL, advanced BI tools, with growing Python skills and AI integration 
                to transform complex business challenges into scalable analytics solutions that deliver measurable results.
              </p>
              <p className="text-lg text-noir-600 mb-8 leading-relaxed">
                When I'm not managing cross-functional teams, you'll find me crafting complex SQL queries, designing interactive Tableau dashboards, 
                building ETL pipelines, or developing intelligent reporting systems that empower executives with real-time insights for strategic decision making.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">
                  Download Resume
                </button>
                <button className="btn-secondary">
                  Let's Connect
                </button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="w-full h-96 bg-gradient-to-br from-sage-200 to-sage-300 rounded-2xl shadow-2xl flex items-center justify-center">
                  <span className="text-6xl font-bold text-noir-600">CS</span>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute top-8 left-8 w-full h-96 bg-gradient-to-br from-moss-200 to-moss-300 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* Stats Section */}
      <section className="py-10 bg-ivory-200/30">
        <div className="modern-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-noir-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-noir-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-10">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-noir-900 mb-2">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-lg md:text-xl text-noir-600 font-medium max-w-2xl mx-auto">
              Strategic expertise and methodologies for driving organizational success
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold text-noir-900 mb-3">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-moss-500 rounded-full mr-2 flex-shrink-0"></div>
                      <span className="text-noir-600 text-sm leading-tight">{tech}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Values Section */}
      <section className="py-10 bg-ivory-200/30">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-noir-900 mb-2">
              Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg md:text-xl text-noir-600 font-medium max-w-2xl mx-auto">
              The principles that guide my work and approach to problem-solving
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Strategic Focus',
                description: 'Delivering measurable business outcomes through data-driven decision making and strategic planning.'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Team Leadership',
                description: 'Empowering cross-functional teams to achieve excellence through clear communication and collaboration.'
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Business Intelligence',
                description: 'Transforming complex data into actionable insights that drive organizational growth and efficiency.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-noir-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-noir-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;