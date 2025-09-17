import { motion } from 'framer-motion';
import React from 'react';

const About = () => {
  const skills = [
    {
      category: 'Frontend',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL']
    },
    {
      category: 'Data & Cloud',
      technologies: ['Apache Airflow', 'Snowflake', 'AWS', 'Docker', 'Kubernetes']
    },
    {
      category: 'Tools & Practices',
      technologies: ['Git', 'CI/CD', 'Testing', 'Agile', 'System Design']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '99%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-ivory-300">
      {/* Hero Section */}
      <section className="pt-20 pb-16 modern-gradient">
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
                I'm a passionate Full Stack Developer and Data Engineer with over 5 years of experience 
                building scalable applications and data infrastructure. I love turning complex problems 
                into elegant solutions that drive business growth.
              </p>
              <p className="text-lg text-noir-600 mb-8 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source 
                projects, or sharing knowledge through technical writing and mentoring.
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
      <section className="py-16 bg-ivory-200/30">
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
      <section className="py-16">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-noir-900 mb-2">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-lg md:text-xl text-noir-600 font-medium max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-xl font-bold text-noir-900 mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.technologies.map((tech, techIndex) => (
                    <li key={techIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-moss-500 rounded-full mr-3"></div>
                      <span className="text-noir-600">{tech}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Values Section */}
      <section className="py-16 bg-ivory-200/30">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
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
                icon: '🚀',
                title: 'Innovation',
                description: 'Always looking for better ways to solve problems and create value through technology.'
              },
              {
                icon: '🤝',
                title: 'Collaboration',
                description: 'Believing that the best solutions come from diverse perspectives and teamwork.'
              },
              {
                icon: '📈',
                title: 'Growth',
                description: 'Committed to continuous learning and helping others develop their skills.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
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