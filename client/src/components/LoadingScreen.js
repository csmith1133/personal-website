import { motion } from 'framer-motion';
import React from 'react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-unt-green"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 mb-10"
      >
        <img src="/images/logos/script_name.png" alt="Charlie Smith" className="h-32 md:h-40 brightness-0 invert" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 w-48"
      >
        <div className="h-[3px] bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-full bg-unt-lime"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
