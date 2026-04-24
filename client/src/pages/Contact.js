import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/contact', formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="modern-container pb-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-sm text-unt-green font-medium tracking-wider"
        >
          CONTACT
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-6xl md:text-7xl lg:text-8xl text-unt-green mt-4 mb-6"
        >
          LET'S CONNECT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Ready to bring your ideas to life? Let's discuss your project.
        </motion.p>
      </section>

      {/* Split Section */}
      <section className="py-12">
        <div className="modern-container">
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-0 rounded-3xl overflow-hidden shadow-xl">
            {/* Green sidebar */}
            <div className="bg-unt-green p-8 md:p-10 text-white">
              <h2 className="font-display text-3xl text-unt-lime mb-8">GET IN TOUCH</h2>

              <div className="space-y-6 mb-10">
                <a href="mailto:charlessmith2@me.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-unt-lime group-hover:text-unt-dark transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">Email</div>
                    <div className="text-white font-medium text-sm">charlessmith2@me.com</div>
                  </div>
                </a>
                <a href="https://github.com/csmith1133" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-unt-lime group-hover:text-unt-dark transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">GitHub</div>
                    <div className="text-white font-medium text-sm">github.com/csmith1133</div>
                  </div>
                </a>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                {[
                  { label: 'Response Time', value: 'Within 24 hours', dot: '#BBF056' },
                  { label: 'Availability', value: 'Currently Available', dot: '#34d399' },
                  { label: 'Time Zone', value: '9 AM - 6 PM CST', dot: '#60a5fa' },
                ].map((info, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: info.dot }} />
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-wider">{info.label}</div>
                      <div className="text-white/80 text-sm">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* White form area */}
            <div className="bg-white p-8 md:p-10">
              <h2 className="font-display text-3xl text-unt-green mb-2">SEND A MESSAGE</h2>
              <p className="text-gray-400 text-sm mb-8">All fields are required</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="modern-input" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="modern-input" placeholder="your.email@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="modern-input" placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange} required className="modern-textarea" placeholder="Tell me about your project..." />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
