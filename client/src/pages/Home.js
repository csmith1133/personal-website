import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/csmith1133',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      isInternal: false
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/csmithunt',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      isInternal: false
    },
    {
      name: 'Email',
      url: 'mailto:charlessmith2@me.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      isInternal: false
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-ivory-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-moss-200/30 to-moss-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-ivory-50/40 to-ivory-100/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 modern-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Name */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-noir-900 mb-4">
                Charles{' '}
                <span className="gradient-text">Smith</span>
              </h1>
            </div>

            {/* Dynamic Title */}
            <div className="mb-8 overflow-hidden">
              <TypeAnimation
                sequence={[
                  'Business Intelligence Leader',
                  2000,
                  'Project Manager',
                  2000,
                  'SQL Expert & Python Developer',
                  2000,
                  'Tableau & Power BI Specialist',
                  2000,
                  'ETL & Analytics Professional',
                  2000,
                  'AI-Driven Analytics Specialist',
                  2000,
                  'PMP Certified Professional',
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-noir-600 overflow-hidden"
                repeat={Infinity}
              />
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-noir-600 leading-relaxed mb-8 max-w-2xl">
              Combining strategic leadership with deep technical expertise to drive business transformation. 
              I specialize in SQL and advanced BI tools like Tableau and Power BI, with growing Python skills and AI integration to build scalable analytics solutions that empower data-driven decision making across organizations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/work" className="btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.isInternal ? '_self' : '_blank'}
                  rel={link.isInternal ? '' : 'noopener noreferrer'}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 bg-ivory-200/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl text-noir-700 hover:text-noir-900 transition-all duration-300 border border-ivory-100/50"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="w-full max-w-lg h-96 lg:h-[500px] bg-gradient-to-br from-sage-200 to-sage-300 rounded-2xl shadow-2xl flex items-center justify-center mx-auto overflow-hidden">
                {/* Placeholder for profile image */}
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-sage-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-noir-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-noir-600 text-sm">Profile Photo</p>
                  <p className="text-neutral-500 text-xs mt-1">Coming Soon</p>
                </div>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-8 left-8 w-full max-w-lg h-96 lg:h-[500px] bg-gradient-to-br from-moss-200 to-moss-300 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-sage-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-sage-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;