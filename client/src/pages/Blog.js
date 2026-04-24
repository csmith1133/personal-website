import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Data Engineering', 'Technology', 'Tutorials'];

  const blogPosts = [
    { id: 1, title: 'Building Scalable React Applications', excerpt: 'Learn the best practices for building maintainable and scalable React applications.', category: 'Web Development', date: 'Coming Soon', readTime: '8 min read', status: 'draft' },
    { id: 2, title: 'Data Pipeline Architecture with Apache Airflow', excerpt: 'A comprehensive guide to designing robust data pipelines using Apache Airflow.', category: 'Data Engineering', date: 'Coming Soon', readTime: '12 min read', status: 'draft' },
    { id: 3, title: 'Modern CSS Techniques for Better UX', excerpt: 'Explore advanced CSS techniques to create stunning user experiences.', category: 'Web Development', date: 'Coming Soon', readTime: '6 min read', status: 'draft' },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero */}
      <section className="modern-container pb-12 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-unt-green font-medium tracking-wider"
        >
          WRITING
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-6xl md:text-7xl lg:text-8xl text-unt-green mt-4 mb-6"
        >
          BLOG & INSIGHTS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Thoughts on technology, development practices, and lessons learned.
        </motion.p>
      </section>

      {/* Under Construction */}
      <section className="py-8">
        <div className="modern-container">
          <ScrollReveal>
            <div className="bg-unt-green rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-unt-lime flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-unt-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="font-display text-4xl text-white mb-4">BLOG UNDER CONSTRUCTION</h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto mb-6">
                  I'm preparing high-quality content on data engineering, web development, and technology insights.
                </p>
                <span className="font-mono text-xs text-unt-lime tracking-wider uppercase">Check back soon</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-y border-gray-100 my-8">
        <div className="modern-container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="modern-input pl-12"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-unt-green text-white'
                      : 'bg-white text-gray-500 border border-gray-200 hover:border-unt-green hover:text-unt-green'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-8">
        <div className="modern-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <article className="card group cursor-pointer h-full">
                  <div className="h-44 bg-gradient-to-br from-unt-green/5 to-unt-lime/10 relative flex items-center justify-center">
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-mono text-unt-green bg-unt-green/10 rounded-full">Draft</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-unt-green/10 flex items-center justify-center group-hover:bg-unt-green group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6 text-unt-green group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs text-unt-green font-medium tracking-wider uppercase">{post.category}</span>
                    <h3 className="font-display text-2xl text-gray-900 mt-2 mb-3 group-hover:text-unt-green transition-colors duration-300">
                      {post.title.toUpperCase()}
                    </h3>
                    <p className="text-gray-500 mb-5 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <h3 className="font-display text-2xl text-gray-800 mb-2">NO ARTICLES FOUND</h3>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-unt-green relative py-20 mt-12">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0,80 L1440,0 L1440,80 Z" fill="#00853E" />
          </svg>
        </div>
        <div className="modern-container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-lg mx-auto">
              <h2 className="font-display text-4xl text-white mb-4">STAY UPDATED</h2>
              <p className="text-white/60 mb-8">Get notified when I publish new articles and insights.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Enter your email" className="modern-input flex-1 !bg-white/10 !border-white/20 !text-white !placeholder-white/40" />
                <button className="btn-lime px-8 whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Blog;
