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

  const t = hospitalData.testimonials[testimonialIndex];

  const nextTestimonial = () => {
    setTestimonialDirection(1);
    setTestimonialIndex((prev) =>
      (prev + 1) % hospitalData.testimonials.length
    );
  };

  const prevTestimonial = () => {
    setTestimonialDirection(-1);
    setTestimonialIndex((prev) =>
      (prev - 1 + hospitalData.testimonials.length) % hospitalData.testimonials.length
    );
  };

  const HERO_IMAGES = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
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
              style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
              </div>

              {/* RIGHT CONTENT */}
              <div className="testimonial-content-box">
                <AnimatePresence mode="wait" custom={testimonialDirection}>
                  <motion.div
                    key={testimonialIndex}
                    custom={testimonialDirection}
                    initial={{ x: testimonialDirection === 1 ? 40 : -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: testimonialDirection === -1 ? 40 : -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
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
      <Reveal direction="up" delay={0.1}>
        <section className="contact-mini">
          <div className="container contact-mini-grid">

            {/* LEFT FORM */}
            <Reveal direction="left" delay={0.2}>
              <div className="contact-mini-form">
                <SectionHeader subtitle="Contact Us" align="left" title="Book Appointment" />

                <AppointmentForm />
              </div>
            </Reveal>

            {/* RIGHT MAP */}
            <Reveal direction="right" delay={0.3}>
              <div className="contact-mini-map">
                <iframe
                  src="https://www.google.com/maps?q=kochi&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Reveal>

          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Home;
