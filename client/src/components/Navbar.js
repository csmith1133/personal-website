import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const onGreen = isHome && !scrolled;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const barColor = onGreen ? '#fff' : '#1a1a1a';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_2px_30px_-10px_rgba(0,0,0,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="modern-container">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="block relative z-10">
              <img
                src="/images/logos/script_name.png"
                alt="Charlie Smith"
                className={`h-16 transition-all duration-500 ${onGreen ? 'brightness-0 invert' : ''}`}
              />
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  <Link
                    to={item.path}
                    className={`font-medium relative text-sm uppercase tracking-widest transition-colors duration-500 ${
                      onGreen
                        ? location.pathname === item.path ? 'text-unt-lime' : 'text-white/70 hover:text-white'
                        : `nav-link ${location.pathname === item.path ? 'active' : ''}`
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-[60]"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5, backgroundColor: '#fff' } : { rotate: 0, y: 0, backgroundColor: barColor }}
                className="block w-6 h-[2px] origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[2px]"
                style={{ backgroundColor: menuOpen ? '#fff' : barColor }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5, backgroundColor: '#fff' } : { rotate: 0, y: 0, backgroundColor: barColor }}
                className="block w-6 h-[2px] origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-unt-green flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`font-display text-5xl transition-colors duration-300 ${
                      location.pathname === item.path ? 'text-unt-lime' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
