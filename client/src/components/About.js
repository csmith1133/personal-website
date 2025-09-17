import { motion } from 'framer-motion';
import React from 'react';
import { FaCloud, FaCode, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    {
      icon: FaCode,
      title: 'Full Stack Development',
      description: 'Building end-to-end solutions with modern technologies and best practices.',
    },
    {
      icon: FaDatabase,
      title: 'Data Engineering',
      description: 'Designing robust data pipelines and analytics platforms for business insights.',
    },
    {
      icon: FaCloud,
      title: 'Cloud Architecture',
      description: 'Implementing scalable cloud solutions with focus on performance and security.',
    },
    {
      icon: FaLightbulb,
      title: 'Problem Solving',
      description: 'Turning complex challenges into elegant, efficient, and maintainable solutions.',
    },
  ];

  const stats = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '15+', label: 'Technologies Mastered' },
    { number: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Passionate Developer & Data Enthusiast
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a seasoned full-stack developer and data engineer with a passion for creating 
                innovative solutions that make a real impact. My journey in technology began with 
                curiosity about how things work and evolved into a career dedicated to building 
                systems that solve complex problems.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Currently, I specialize in financial operations analytics, where I combine my 
                technical expertise with business acumen to deliver data-driven insights and 
                automated solutions. I thrive in environments where technology meets business 
                strategy, and I'm always excited to tackle new challenges.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying at the forefront of technological innovation.
              </p>
            </div>

            {/* Personal Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-white dark:bg-dark-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      <highlight.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {highlight.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="bg-white dark:bg-dark-700 rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">CS</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Charles Smith</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  Full Stack Developer & Data Engineer
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="text-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg"
                  >
                    <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Philosophy Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="animated-border"
            >
              <div className="animated-border-content">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  My Philosophy
                </h4>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "Great software is not just about clean code and scalable architecture—it's about 
                  understanding the people who will use it and creating solutions that genuinely 
                  improve their lives."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={highlight.title} className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <highlight.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{highlight.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

