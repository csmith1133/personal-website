import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-unt-green text-white py-12">
      <div className="modern-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <img src="/images/logos/script_name.png" alt="Charlie Smith" className="h-10 brightness-0 invert" />
            <span className="text-white/50 text-sm">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/csmith1133" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-unt-lime transition-colors text-sm font-medium uppercase tracking-wider">
              GitHub
            </a>
            <a href="mailto:charlessmith2@me.com" className="text-white/60 hover:text-unt-lime transition-colors text-sm font-medium uppercase tracking-wider">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
