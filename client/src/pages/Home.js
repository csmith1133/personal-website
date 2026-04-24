import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Marquee from '../components/Marquee';

const Home = () => {
  const marqueeItems = [
    'SQL', 'Tableau', 'Power BI', 'Python', 'Snowflake', 'ETL', 'Jira',
    'Financial Modeling', 'Data Automation', 'Project Management', 'AI Integration',
    'Databricks', 'JavaScript', 'React', 'Six Sigma',
  ];

  return (
    <div>
      {/* Hero — Full green */}
      <section className="relative bg-unt-green min-h-[calc(100vh-6rem)] flex flex-col justify-center overflow-hidden -mt-24 pt-24">
        <div className="modern-container relative z-10 py-20 md:py-28">
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-display leading-[0.85] tracking-tight mb-6"
            >
              <span className="block text-white text-[16vw] md:text-[12vw] lg:text-[10vw]">CHARLIE</span>
              <span className="block text-unt-lime text-[16vw] md:text-[12vw] lg:text-[10vw]">SMITH</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center mb-8"
            >
              <div className="w-12 h-[3px] bg-unt-lime mr-4" />
              <TypeAnimation
                sequence={[
                  'Business Intelligence Leader',
                  2500,
                  'Project Manager',
                  2500,
                  'SQL Expert & Python Developer',
                  2500,
                  'Tableau & Power BI Specialist',
                  2500,
                  'AI-Driven Analytics Specialist',
                  2500,
                  'PMP Certified Professional',
                  2500,
                ]}
                wrapper="span"
                speed={50}
                className="font-mono text-sm md:text-base text-white/70"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed mb-10"
            >
              Combining strategic leadership with deep technical expertise to build
              scalable analytics solutions that empower data-driven decision making.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="/work" className="btn-lime">View My Work</Link>
              <Link to="/contact" className="font-semibold py-4 px-8 rounded-full flex items-center justify-center text-white border-2 border-white/30 hover:bg-white hover:text-unt-green transition-all duration-300">
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              {[
                { name: 'GitHub', url: 'https://github.com/csmith1133', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
                { name: 'Email', url: 'mailto:charlessmith2@me.com', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.name === 'Email' ? '_self' : '_blank'}
                  rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
                  className="p-3 rounded-full border-2 border-white/20 text-white/60 hover:text-unt-lime hover:border-unt-lime transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Diagonal cut */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>

      {/* Skills marquee */}
      <section className="py-8 bg-surface">
        <Marquee items={marqueeItems} speed={50} />
      </section>
    </div>
  );
};

export default Home;
