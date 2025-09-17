import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [skills, setSkills] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('/api/skills');
        setSkills(response.data);
        setActiveCategory(Object.keys(response.data)[0] || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data
        const fallbackSkills = {
          "Programming Languages": ["Python", "JavaScript", "TypeScript", "SQL", "Bash"],
          "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
          "Backend": ["Node.js", "Express", "FastAPI", "Flask"],
          "Databases": ["PostgreSQL", "Snowflake", "Oracle", "MongoDB"],
          "Cloud & DevOps": ["Docker", "Kubernetes", "AWS", "Terraform", "Airflow"],
          "Data & Analytics": ["Pandas", "NumPy", "Streamlit", "DBT", "Apache Spark"]
        };
        setSkills(fallbackSkills);
        setActiveCategory('Programming Languages');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const skillIcons = {
    'Python': '🐍',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'SQL': '🗃️',
    'Bash': '📟',
    'React': '⚛️',
    'Next.js': '▲',
    'Tailwind CSS': '🎨',
    'HTML5': '🌐',
    'CSS3': '🎨',
    'Node.js': '💚',
    'Express': '🚀',
    'FastAPI': '⚡',
    'Flask': '🌶️',
    'PostgreSQL': '🐘',
    'Snowflake': '❄️',
    'Oracle': '🔶',
    'MongoDB': '🍃',
    'Docker': '🐳',
    'Kubernetes': '⛵',
    'AWS': '☁️',
    'Terraform': '🏗️',
    'Airflow': '🌊',
    'Pandas': '🐼',
    'NumPy': '🔢',
    'Streamlit': '📊',
    'DBT': '🔄',
    'Apache Spark': '⚡'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 dark:bg-primary-900 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-2 sticky top-24">
              {Object.keys(skills).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  <div className="font-medium">{category}</div>
                  <div className="text-sm opacity-80">
                    {skills[category]?.length || 0} skills
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-8">
              <motion.h3
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {activeCategory}
              </motion.h3>

              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {skills[activeCategory]?.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                    }}
                    className="bg-white dark:bg-dark-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {skillIcons[skill] || '⚙️'}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {skill}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skill Proficiency Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-dark-800 dark:to-dark-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Expertise Level
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { level: 'Expert', percentage: 90, skills: ['Python', 'JavaScript', 'SQL'] },
                { level: 'Advanced', percentage: 80, skills: ['React', 'Node.js', 'Docker'] },
                { level: 'Intermediate', percentage: 70, skills: ['TypeScript', 'Kubernetes'] },
                { level: 'Learning', percentage: 60, skills: ['Machine Learning', 'Rust'] }
              ].map((category, index) => (
                <motion.div
                  key={category.level}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        className="dark:stroke-dark-600"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray={`${category.percentage}, 100`}
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${category.percentage}, 100` }}
                        transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {category.level}
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {category.skills.join(', ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

