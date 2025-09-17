import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory-300">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
