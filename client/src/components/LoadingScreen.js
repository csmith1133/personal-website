import { motion } from 'framer-motion';
import React from 'react';

const LoadingScreen = () => {
  // Floating particles animation
  const particles = Array.from({ length: 12 }, (_, i) => i);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-ivory-300 via-ivory-200 to-ivory-300 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-32 h-32 border-2 rounded-full"
          style={{ borderColor: 'rgba(27, 27, 27, 0.3)' }}
        />
        
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-32 right-24 w-24 h-24 rounded-2xl transform rotate-45"
          style={{ background: 'linear-gradient(to bottom right, rgba(27, 27, 27, 0.2), rgba(27, 27, 27, 0.3))' }}
        />

        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3.5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-neutral-200/40 to-neutral-300/40 rounded-full"
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle}
            initial={{ 
              opacity: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: 'linear-gradient(to bottom right, rgba(27, 27, 27, 0.6), rgba(27, 27, 27, 0.8))' }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center relative z-10 px-6">
        {/* Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="logo-brush block text-center">
            <span className="block" style={{ 
              fontSize: '5rem', 
              fontWeight: 700, 
              color: '#1B1B1B',
              lineHeight: 0.75 
            }}>
              Charlie
            </span>
            <span className="block ml-2" style={{ 
              fontSize: '4.5rem', 
              fontWeight: 600, 
              color: '#1B1B1B',
              marginTop: '-0.5rem',
              opacity: 0.9 
            }}>
              Smith
            </span>
          </div>
        </motion.div>

        {/* Elegant Progress Bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-sm mx-auto"
        >
          <div className="relative h-2 bg-ivory-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 2.5, 
                delay: 1.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(to right, rgba(27, 27, 27, 0.7), rgba(27, 27, 27, 0.9), rgba(27, 27, 27, 1))' }}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: [-200, 400] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;