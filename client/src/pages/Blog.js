import { motion } from 'framer-motion';
import React, { useState } from 'react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'Data Engineering', 'Technology', 'Tutorials'];

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building maintainable and scalable React applications.',
      category: 'Web Development',
      date: 'Coming Soon',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      status: 'draft'
    },
    {
      id: 2,
      title: 'Data Pipeline Architecture with Apache Airflow',
      excerpt: 'A comprehensive guide to designing robust data pipelines using Apache Airflow.',
      category: 'Data Engineering',
      date: 'Coming Soon',
      readTime: '12 min read',
      image: '/api/placeholder/400/250',
      status: 'draft'
    },
    {
      id: 3,
      title: 'Modern CSS Techniques for Better UX',
      excerpt: 'Explore advanced CSS techniques to create stunning user experiences.',
      category: 'Web Development',
      date: 'Coming Soon',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      status: 'draft'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="pt-20 pb-12 modern-gradient">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-noir-900 mb-6">
              Blog & <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl md:text-2xl text-noir-600 mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
              Thoughts on technology, development practices, and lessons learned.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Under Construction Notice */}
      <section className="py-16">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card max-w-2xl mx-auto text-center p-12"
          >
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-3xl font-bold text-noir-900 mb-4">
              Blog Under Construction
            </h2>
            <p className="text-noir-600 mb-6 text-lg leading-relaxed">
              I'm currently working on setting up my blog platform and preparing high-quality content. 
              Check back soon for articles on data engineering, web development, and technology insights!
            </p>
            <div className="text-accent-600 font-semibold">
              Expected launch: Q1 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-cream-100/30">
        <div className="modern-container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex-1 max-w-md"
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="modern-input pl-12"
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-noir-900 text-white'
                      : 'bg-cream-200/80 text-noir-600 hover:bg-cream-300/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Preview */}
      <section className="py-16">
        <div className="modern-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group cursor-pointer relative overflow-hidden"
              >
                {/* Draft Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
                    Draft
                  </span>
                </div>

                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-t-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                <div className="p-6">
                  {/* Category */}
                  <div className="text-accent-600 text-sm font-medium mb-2">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-noir-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-noir-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-noir-900 mb-2">No articles found</h3>
              <p className="text-noir-600">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-noir-900">
        <div className="modern-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-neutral-300 mb-8 text-lg">
              Get notified when I publish new articles and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-cream-100/90 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;