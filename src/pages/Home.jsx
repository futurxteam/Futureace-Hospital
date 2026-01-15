import React from "react";
import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import "./style/Home.css";
import Reveal from "../components/Reveal";
import AppointmentSection from "../components/ContactForm";
import { useEffect, useState } from "react";
import DepartmentsShowcase from "./home/DepartmentsShowcase";
import StatsCounter from "./home/StatsCounter";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  MonitorPlay,
  HeartPulse,
  Armchair
} from "lucide-react";

function TypewriterHeading({ onDone }) {
  const text = "Get Better Care For Your Health";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
        setDone(true);
        onDone && onDone();   // 👈 notify parent when finished
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="hero-title">
      {displayed.split("Your Health")[0]}
      <span className="gradient-text">
        {displayed.includes("Your Health") ? "Your Health" : ""}
      </span>

      {/* Blinking cursor */}
      {!done && <span className="type-cursor">|</span>}
    </h1>
  );
}


/* ===============================
   SECTION TITLE COMPONENT
=============================== */
const SectionTitle = ({ children, align = "center" }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`section-title ${align}`}
  >
    {children}
  </motion.h2>
);

/* ===============================
   HOME PAGE
=============================== */
const Home = () => {
    const FACILITY_ICONS = {
  Stethoscope: Stethoscope,
  MonitorPlay: MonitorPlay,
  HeartPulse: HeartPulse,
  Armchair: Armchair,
};
const [currentIndex, setCurrentIndex] = useState(0);
const [typingDone, setTypingDone] = useState(false);

const visibleCount = 3;
const maxIndex = hospitalData.doctors.length - visibleCount;

const nextSlide = () => {
  setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
};

  return (
    <div className="home-root">

      {/* ================= HERO ================= */}
      {/* ================= HERO ================= */}
<section className="hero hero-bg">
  <div className="hero-container">

    {/* LEFT */}
    <div className="hero-left">
      <span className="hero-badge">
        South India's First Boutique Hospital
      </span>

<TypewriterHeading onDone={() => setTypingDone(true)} />
{typingDone && (
  <motion.p
    className="hero-desc"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.0, ease: "easeOut" }}
  >
    Experience white-glove service in a state-of-the-art facility.
    We treat you like family, not just a patient.
  </motion.p>
)}


      <div className="hero-actions">
<Link to="/contact-us" className="btn-appointment">
  Appointment
  <span>➜</span>
</Link>

        <button className="btn-learnmore">Learn More</button>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="hero-right">
      <motion.div
        className="hero-image-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src="https://wallpapercave.com/wp/wp2655089.jpg"
          alt="Doctors"
        />
      </motion.div>
    </div>

  </div>
</section>
<Reveal>
<DepartmentsShowcase />
     </Reveal>
     <Reveal direction="top">
<StatsCounter />
</Reveal>


      {/* ================= FACILITIES ================= */}
    {/* ================= FACILITIES (TIMELINE STYLE) ================= */}
    <Reveal direction="down">
<section className="section section-light">
  <div className="container">
    <SectionTitle>World-Class Facilities</SectionTitle>

    <div className="facilities-timeline">

      {/* Connector line */}
      <div className="timeline-line" />
{hospitalData.facilities.slice(0, 3).map((fac, idx) => {
  const IconComp = FACILITY_ICONS[fac.icon] || Stethoscope;

  return (
    <motion.div
      key={idx}
      className="timeline-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
    >
      <div className="timeline-icon">
        <IconComp size={36} />
      </div>

      <h4 className="timeline-title">{fac.title}</h4>
      <p className="timeline-desc">{fac.description}</p>
    </motion.div>
  );
})}


    </div>
  </div>
</section>
</Reveal>

     {/* ================= DOCTORS ================= */}
     <Reveal direction="up">
<section className="section container">
  <div className="section-header">
    <SectionTitle align="left">Meet Our Specialists</SectionTitle>

   <div className="doctors-carousel-wrapper">

  {/* LEFT ARROW */}
  <button className="carousel-arrow left" onClick={prevSlide}>
    ‹
  </button>

  {/* RIGHT ARROW */}
  <button className="carousel-arrow right" onClick={nextSlide}>
    ›
  </button>

  <div className="doctors-carousel-window">
    <div
      className="doctors-carousel-track"
      style={{ transform: `translateX(-${currentIndex * 33.3333}%)` }}
    >
      {hospitalData.doctors.map((doc) => (
        <div key={doc.id} className="doctor-slide">

          <div className="doctor-card-modern">
            <div className="doctor-image-wrap">
              <img src={doc.image} alt={doc.name} />
              <div className="doctor-plus">+</div>
            </div>

            <div className="doctor-meta">
              <h3>{doc.name}</h3>
              <p className="doctor-role">{doc.specialty}</p>
              <p className="doctor-exp">Working Since 2004</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>

</div>

  </div>
</section>
</Reveal>

      {/* ================= TESTIMONIALS ================= */}
     {/* ================= TESTIMONIALS ================= */}
     <Reveal direction="lwft">
<section className="section section-light">
  <div className="container">
    <SectionTitle>Patient Stories</SectionTitle>

    <div className="testimonials-list">
      {hospitalData.testimonials.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="testimonial-wide-card"
        >
          {/* Left image */}
          <div className="testimonial-photo">
            <img src={t.image} alt={t.name} />
          </div>

          {/* Right content */}
          <div className="testimonial-content">
            <div className="testimonial-quote">“</div>

            <h3>{t.name}</h3>
            <p className="testimonial-role">{t.role}</p>

            <p className="testimonial-text">{t.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
</Reveal>
<Reveal direction="up">
<section className="section-contact">

    <div className="contact-container">
      <div className="contact-info">
        <AppointmentSection />
      </div>
    </div>
    </section>
    </Reveal>
    </div>
  );
};

export default Home;
