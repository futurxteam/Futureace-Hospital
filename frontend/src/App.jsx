import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AppointmentSection from './components/ContactForm';
import Doctors from './pages/Doctors';
import AboutUs from './components/AboutUs';
import Specialities from './pages/Specialities';
import DepartmentDetail from './pages/DepartmentDetail';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ConsultationSuccess from './pages/ConsultationSuccess';
import BookConsultation from './pages/BookConsultation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import HealthCalculator from './pages/HealthCalculator';
import DieticianPlan from './pages/DieticianPlan';
import MetaPixelTracker from './components/MetaPixelTracker';
import VaricoseVeinsTreatment from './pages/VaricoseVeinsTreatment';
import { VARICOSE_ROUTE } from './config/varicoseVeinsConfig';

// Simple placeholder for other pages
const PagePlaceholder = ({ title }) => (
  <div className="container" style={{ paddingTop: '120px', minHeight: '60vh' }}>
    <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>{title}</h1>
    <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.2rem' }}>
      Content for {title} will be coming soon.
    </p>
  </div>
);

// The varicose veins landing page ships its own WhatsApp button (with a
// treatment-specific message), so the site-wide one is hidden there.
function SiteWhatsAppButton() {
  const { pathname } = useLocation();
  if (pathname === VARICOSE_ROUTE) return null;
  return <WhatsAppButton />;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MetaPixelTracker />
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/health-calculator" element={<HealthCalculator />} />
          <Route path="/dietician-plan" element={<DieticianPlan />} />
          <Route path="/contact-us" element={<AppointmentSection />} />
          <Route path="/department/:id" element={<DepartmentDetail />} />
          <Route path="/consultation" element={<BookConsultation />} />
          <Route path="/consultation-success" element={<ConsultationSuccess />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path={VARICOSE_ROUTE} element={<VaricoseVeinsTreatment />} />
        </Routes>
        <Footer />
        <SiteWhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
