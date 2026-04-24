import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from '../components/InfiniteScroll';
import ScrollReveal from '../components/ScrollReveal';
import { parseExperience } from '../utils/resumeParser';

const About = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState('5+');

  useEffect(() => {
    const loadExperienceData = async () => {
      try {
        const response = await fetch('/api/resume-experience');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const experienceEntries = parseExperience(result.data);
            const allYears = [];
            experienceEntries.forEach((entry) => {
              const period = entry.period.trim();
              const fullPeriodMatch = period.match(/(\w+\.?)\s+(\d{4})\s*-\s*(?:(\w+\.?)\s+(\d{4})|Present)/);
              if (fullPeriodMatch) {
                allYears.push(parseInt(fullPeriodMatch[2]));
              } else {
                const singleDateMatch = period.match(/(\w+\.?)\s+(\d{4})/);
                if (singleDateMatch) allYears.push(parseInt(singleDateMatch[2]));
              }
            });
            if (allYears.length > 0) {
              const earliestYear = Math.min(...allYears);
              const calculatedYears = new Date().getFullYear() - earliestYear;
              setYearsOfExperience(`${calculatedYears}+`);
            }
          }
        }
      } catch (error) {
        console.error('Error loading experience data:', error);
      }
    };
    loadExperienceData();
  }, []);

  const stats = [
    { number: '25+', label: 'Projects Delivered' },
    { number: yearsOfExperience, label: 'Years Experience' },
    { number: '100+', label: 'Team Members Trained' },
    { number: '$500K+', label: 'Cost Savings Achieved' },
  ];

  const skillGroups = [
    { category: 'Data Analysis & BI', skills: ['Tableau', 'Power BI', 'Snowflake', 'ETL Pipelines', 'Data Automation', 'Financial Modeling', 'AI Integration'] },
    { category: 'Finance & Strategy', skills: ['Cost Analysis', 'Budgeting & Forecasting', 'Business Strategy', 'Financial Reporting'] },
    { category: 'Project Management', skills: ['Project Management (PMP)', 'Six Sigma (CSSGB)', 'Logistics', 'Inventory Control'] },
    { category: 'Development', skills: ['SQL', 'Python', 'JavaScript', 'HTML', 'CSS', 'Git'] },
    { category: 'Tools & Collaboration', skills: ['Jira', 'MS Office', 'Google Drive', 'Monday.com', 'Slack'] },
  ];

  const values = [
    { title: 'Strategic Focus', description: 'Delivering measurable business outcomes through data-driven decision making and strategic planning.' },
    { title: 'Team Leadership', description: 'Empowering cross-functional teams to achieve excellence through clear communication and collaboration.' },
    { title: 'Business Intelligence', description: 'Transforming complex data into actionable insights that drive organizational growth and efficiency.' },
  ];

  const techLogos = [
    { name: 'Tableau', logo: 'https://raw.githubusercontent.com/get-icon/geticon/master/icons/tableau-icon.svg', isSmall: true },
    { name: 'Power BI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
    { name: 'Snowflake', logo: 'https://companieslogo.com/img/orig/SNOW-35164165.png', isLarge: true },
    { name: 'Databricks', logo: 'https://www.vectorlogo.zone/logos/databricks/databricks-icon.svg' },
    { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
    { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
    { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
    { name: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="modern-container pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-sm text-unt-green font-medium tracking-wider"
            >
              ABOUT ME
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl text-unt-green mt-4 mb-8"
            >
              BUILDING THE BRIDGE BETWEEN DATA & DECISIONS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              I'm a Project Manager and Business Intelligence Leader with over 5 years of experience
              combining strategic leadership with deep technical expertise. I specialize in SQL, advanced BI tools,
              with growing Python skills and AI integration to transform complex business challenges into scalable
              analytics solutions.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-base leading-relaxed"
            >
              When I'm not leading strategic initiatives, you'll find me crafting complex SQL queries, designing
              interactive Tableau dashboards, architecting data solutions, and implementing intelligent reporting
              systems that empower executives with real-time insights.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-2 gap-4 lg:mt-20"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-unt-green rounded-2xl p-6 text-center">
                <div className="font-display text-4xl md:text-5xl text-unt-lime mb-1">{stat.number}</div>
                <div className="text-white/60 text-xs uppercase tracking-[0.15em] font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-unt-green relative py-24">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,0 L1440,80 L0,80 Z" fill="#00853E" />
          </svg>
        </div>

        <div className="modern-container relative z-10">
          <ScrollReveal>
            <div className="mb-16">
              <span className="font-mono text-sm text-unt-lime font-medium tracking-wider">EXPERTISE</span>
              <h2 className="font-display text-5xl md:text-6xl text-white mt-3">SKILLS & TECHNOLOGIES</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {skillGroups.map((group, index) => (
              <ScrollReveal key={group.category} delay={index * 0.08}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 h-full">
                  <h3 className="font-display text-xl text-unt-lime mb-4">{group.category.toUpperCase()}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 text-xs text-white/70 bg-white/5 rounded-full border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>

      {/* Tech Logo Ribbon */}
      <section className="py-12 overflow-hidden">
        <div className="relative">
          <InfiniteScroll />
          <div className="scroller" data-speed="fast">
            <ul className="scroller__inner">
              {techLogos.map((tech, index) => (
                <li key={index} className="scroller__item">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={`${tech.isLarge ? 'w-20 h-20' : tech.isSmall ? 'w-16 h-16' : 'w-20 h-20'} object-contain tech-logo`}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </li>
              ))}
              {techLogos.map((tech, index) => (
                <li key={`dup-${index}`} className="scroller__item" aria-hidden="true">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={`${tech.isLarge ? 'w-20 h-20' : tech.isSmall ? 'w-16 h-16' : 'w-20 h-20'} object-contain tech-logo`}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-surface to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="modern-container">
          <ScrollReveal>
            <div className="mb-16">
              <span className="font-mono text-sm text-unt-green font-medium tracking-wider">PRINCIPLES</span>
              <h2 className="font-display text-5xl md:text-6xl text-unt-green mt-3">CORE VALUES</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.12}>
                <div className="card p-8 h-full border-l-4 border-l-unt-green">
                  <h3 className="font-display text-2xl text-unt-green mb-4">{value.title.toUpperCase()}</h3>
                  <p className="text-gray-500 leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
