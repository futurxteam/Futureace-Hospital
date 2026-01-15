import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppointmentSection from './components/ContactForm';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Specialities from './pages/Specialities';
// Simple placeholder for other pages
const PagePlaceholder = ({ title }) => (
  <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>
    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>{title}</h1>
    <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.2rem' }}>
      Content for {title} will be coming soon.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact-us" element={<AppointmentSection />} />
         
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
