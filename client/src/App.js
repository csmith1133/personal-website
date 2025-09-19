import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

// Pages
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Work from './pages/Work';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            className="mt-16"
          />
        </Layout>
      </Router>
  );
}

export default App;
