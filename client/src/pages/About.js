import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import InfiniteScroll from '../components/InfiniteScroll';
import { parseExperience } from '../utils/resumeParser';

const About = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState('5+');

  // Keep original skills as fallback (can be removed later)
  const fallbackSkills = [
    {
      category: 'Data Analysis & BI',
      icon: (
        <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      technologies: ['Tableau', 'Power BI', 'Snowflake', 'ETL Pipelines', 'Data Automation', 'Financial Modeling', 'AI Integration']
    },
    {
      category: 'Finance & Strategy',
      icon: (
        <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      technologies: ['Cost Analysis', 'Budgeting & Forecasting', 'Business Strategy', 'Financial Reporting']
    },
    {
      category: 'Project Management',
      icon: (
        <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      technologies: ['Project Management (PMP)', 'Six Sigma (CSSGB)', 'Logistics', 'Inventory Control']
    },
    {
      category: 'Development',
      icon: (
        <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      technologies: ['SQL', 'Python', 'JavaScript', 'HTML', 'CSS', 'Git']
    },
    {
      category: 'Tools & Collaboration',
      icon: (
        <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      technologies: ['Jira', 'MS Office', 'Google Drive', 'Monday.com', 'Slack']
    }
  ];

useEffect(() => {
  const loadExperienceData = async () => {
    const API_URL =
      process.env.REACT_APP_API_URL ||
      (window.location.hostname === "localhost"
        ? "http://localhost:5001"
        : "http://charlie-personal-website-backend:5000");

    try {
      const response = await fetch(`${API_URL}/api/resume-experience`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          const experienceEntries = parseExperience(result.data);

          const allYears = [];
          experienceEntries.forEach(entry => {
            const period = entry.period.trim();

            const fullPeriodMatch = period.match(
              /(\w+\.?)\s+(\d{4})\s*-\s*(?:(\w+\.?)\s+(\d{4})|Present)/
            );
            if (fullPeriodMatch) {
              allYears.push(parseInt(fullPeriodMatch[2]));
            } else {
              const singleDateMatch = period.match(/(\w+\.?)\s+(\d{4})/);
              if (singleDateMatch) {
                allYears.push(parseInt(singleDateMatch[2]));
              }
            }
          });

          if (allYears.length > 0) {
            const earliestYear = Math.min(...allYears);
            const currentYear = new Date().getFullYear();
            const calculatedYears = currentYear - earliestYear;
            setYearsOfExperience(`${calculatedYears}+`);
          }
        }
      }
    } catch (error) {
      console.error('Error loading experience data for years calculation:', error);
    }
  };

  loadExperienceData();
}, []);


  const stats = [
    { number: '25+', label: 'Projects Delivered' },
    { number: yearsOfExperience, label: 'Years Experience' },
    { number: '100+', label: 'Team Members Trained' },
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
                When I'm not leading strategic initiatives, you'll find me crafting complex SQL queries, designing interactive Tableau dashboards, 
                architecting data solutions, and implementing intelligent reporting systems that empower executives with real-time insights for strategic decision making.
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
            {fallbackSkills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skillGroup.icon || (
                    <svg className="w-8 h-8 text-moss-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg font-bold text-noir-900 mb-4 leading-tight">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-1.5">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="text-center text-sm">
                      <span className="text-noir-700 font-medium leading-tight group-hover:text-noir-900 transition-colors duration-300 whitespace-nowrap">{tech}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Tech Logo Ribbon - Kevin Powell Style */}
          <section className="py-8 bg-ivory-100/50 overflow-hidden">
            <div className="relative">
              <InfiniteScroll />
              <div className="scroller" data-speed="fast">
                <ul className="scroller__inner">
                {[
                  { name: 'Tableau', logo: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/tableau-icon.svg', isSmall: true },
                  { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
                  { name: 'Snowflake', logo: 'https://companieslogo.com/img/orig/SNOW-35164165.png', isLarge: true },
                  { name: 'Databricks', logo: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg' },
                  { name: 'SQL', logo: 'https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.svg' },
                  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                  { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
                  { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
                  { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
                  { name: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
                ].map((tech, index) => (
                  <li key={index} className="scroller__item">
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className={`${
                        tech.isLarge ? 'w-20 h-20' : tech.isSmall ? 'w-16 h-16' : 'w-20 h-20'
                      } object-contain tech-logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </li>
                ))}
                
                {/* Kevin Powell's JavaScript will duplicate these automatically */}
                {[
                  { name: 'Tableau', logo: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/tableau-icon.svg', isSmall: true },
                  { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
                  { name: 'Snowflake', logo: 'https://companieslogo.com/img/orig/SNOW-35164165.png', isLarge: true },
                  { name: 'Databricks', logo: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg' },
                  { name: 'SQL', logo: 'https://symbols.getvecta.com/stencil_28/61_sql-database-generic.90b41636a8.svg' },
                  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                  { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
                  { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
                  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
                  { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
                  { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
                  { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
                  { name: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
                ].map((tech, index) => (
                  <li key={`dup-${index}`} className="scroller__item" aria-hidden="true">
                    <img 
                      src={tech.logo} 
                      alt={tech.name}
                      className={`${
                        tech.isLarge ? 'w-20 h-20' : tech.isSmall ? 'w-16 h-16' : 'w-20 h-20'
                      } object-contain tech-logo`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </li>
                ))}
                </ul>
              </div>
            
              {/* Gradient fade edges */}
              <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-ivory-100/50 to-transparent pointer-events-none z-10"></div>
              <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-ivory-100/50 to-transparent pointer-events-none z-10"></div>
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