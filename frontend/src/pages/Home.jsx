import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import "./style/Home.css";
import "../components/AppointmentSection.css";
import Reveal from "../components/Reveal";
import { useEffect, useState } from "react";
import DepartmentsShowcase from "./home/DepartmentsShowcase";
import StatsCounter from "./home/StatsCounter";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import FacilitiesSection from "../components/FacilitiesSection";
import DoctorsSection from "../components/DoctorsSection";
import AppointmentForm from "../components/AppoinmentForm";

const Home = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState(0);
  const testimonials = hospitalData.testimonials || [];
  const t = testimonials[testimonialIndex];

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setTestimonialDirection(1);
    setTestimonialIndex((prev) =>
      (prev + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setTestimonialDirection(-1);
    setTestimonialIndex((prev) =>
      (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const HERO_IMAGES = [
    "/banner1.jpg",
    "/banner2.webp",
    "/banner3.webp",
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-root">

      {/* ================= HERO ================= */}
      <section className="hero hero-bg-slider">

        {/* Background slider */}
        <div className="hero-bg-wrapper">
          <AnimatePresence>
            <motion.div
              key={heroIndex}
              className="hero-bg-slide"
              style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})`, willChange: "opacity, transform" }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className="hero-content-overlay">
          <div className="hero-container">
            <Reveal direction="up" delay={0.1}>
              <div className="hero-left">
                <span className="hero-badge">
                  South India's First Boutique Hospital
                </span>

                <h1 className="hero-title">
                  Get Better Care For <br />
                  <span className="gradient-text">Your Health</span>
                </h1>

                <p className="hero-desc">
                  Experience white-glove service in a state-of-the-art facility.
                  We treat you like family, not just a patient.
                </p>

                <div className="hero-actions">
                  <Link to="/contact-us" className="cta-eldiora">
                    <span className="cta-label">Get care now</span>
                    <span className="cta-dot">
                      <span className="cta-arrow">↗</span>
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <Reveal>
        <DepartmentsShowcase />
      </Reveal>

      {/* ================= STATS ================= */}
      <Reveal direction="up" delay={0.1}>
        <StatsCounter />
      </Reveal>

      {/* ================= FACILITIES ================= */}
      <Reveal direction="up" delay={0.15}>
        <FacilitiesSection />
      </Reveal>

      {/* ================= DOCTORS ================= */}
      <Reveal direction="up" delay={0.1}>
        <DoctorsSection />
      </Reveal>

      {/* ================= TESTIMONIALS ================= */}
      <Reveal direction="up" delay={0.1}>
        {t && (
          <section className="section container testimonial-showcase">
            <SectionHeader subtitle="Testimonials" align="center" title="Hear From Our Patients" />

            <div className="testimonial-layout">
              {/* LEFT IMAGE */}
              <div className="testimonial-image">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={testimonialIndex}
                    src={t.image}
                    alt={t.name}
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(2px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>

              {/* RIGHT CONTENT */}
              <div className="testimonial-content-box">
                <AnimatePresence mode="wait" custom={testimonialDirection}>
                  <motion.div
                    key={testimonialIndex}
                    custom={testimonialDirection}
                    initial={{ y: testimonialDirection === 1 ? 20 : -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: testimonialDirection === -1 ? 20 : -20, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="testimonial-heading">
                      {t.headline || "Around-the-clock care delivered with compassion"}
                    </h3>

                    <div className="testimonial-quote-box">
                      <p className="testimonial-quote-text">
                        "{t.text}"
                      </p>

                      <div className="testimonial-person">
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* NAV BUTTONS */}
                <div className="testimonial-nav">
                  <button onClick={prevTestimonial} aria-label="Previous testimonial">←</button>
                  <button onClick={nextTestimonial} aria-label="Next testimonial">→</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </Reveal>

      {/* ================= CONTACT ================= */}
      <section className="contact-mini">
        <div className="container contact-mini-grid">

          {/* LEFT FORM */}
          <div className="contact-mini-form">
            <SectionHeader subtitle="Contact Us" align="left" title="Book Appointment" />

            <AppointmentForm />
          </div>

          {/* RIGHT MAP */}
          <div className="contact-mini-map">
            <a 
              href="https://www.google.com/maps?q=10%C2%B001%2750.3%22N+76%C2%B018%2716.8%22E" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-overlay-link"
              title="Open in Google Maps"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.053355027814!2d76.30248!3d10.030639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAnMDEnNTAuMyJOIDc2wrAxOCcxNi44IkU!5e0!3m2!1sen!2sin!4v1712740000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Futureace Hospital Location"
                style={{ pointerEvents: 'none' }}
              ></iframe>
              <div className="map-click-prompt">Click to view on Google Maps</div>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
