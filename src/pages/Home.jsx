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
import "../components/AppointmentSection.css";
import { useNavigate } from "react-router-dom";
function TypewriterHeading({ onDone }) {
  const text = "Get Better Care For Your Health";
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      (prev + 1) % hospitalData.testimonials.length
    );
  }, 6000); // change every 6 seconds

  return () => clearInterval(interval);
}, []);
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
     const FACILITY_IMAGES = [
  "/section1.png",
  "/section2.png",
  "/section3.png",
];

const [activeFacility, setActiveFacility] = useState(0);
const [testimonialIndex, setTestimonialIndex] = useState(0);
const [facilityMobileIndex, setFacilityMobileIndex] = useState(0);
const t = hospitalData.testimonials[testimonialIndex];
const nextTestimonial = () => {
  setTestimonialIndex((prev) =>
    (prev + 1) % hospitalData.testimonials.length
  );
};
useEffect(() => {
  if (window.innerWidth > 900) return; // only run on mobile

  const interval = setInterval(() => {
    setFacilityMobileIndex((prev) => (prev + 1) % FACILITY_IMAGES.length);
  }, 3000); // change every 3 seconds

  return () => clearInterval(interval);
}, []);
const prevTestimonial = () => {
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
  }, 5000); // 5 seconds

  return () => clearInterval(interval);
}, []);
const [doctorIndex, setDoctorIndex] = useState(0);


const nextDoctor = () => {
setDoctorIndex((prev) =>
(prev + 1) % hospitalData.doctors.length
);
};


const prevDoctor = () => {
setDoctorIndex((prev) =>
(prev - 1 + hospitalData.doctors.length) % hospitalData.doctors.length
);
};
  const FACILITY_ICONS = {
    Stethoscope: Stethoscope,
    MonitorPlay: MonitorPlay,
    HeartPulse: HeartPulse,
    Armchair: Armchair,
  };
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      // breakpoint matches CSS media query
      if (window.innerWidth < 900) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(3);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = itemsPerSlide;
  const maxIndex = Math.ceil(hospitalData.doctors.length / 1) - visibleCount; // Simplified max index logic isn't quite right for 1-by-1 stepping with multiple visible, but for single step it's: total - visible
  // Actually, standard logic: maxIndex = length - visibleCount. 
  // If length=6, visible=3 => maxIndex=3. indices: 0,1,2,3. 3 shows docs 3,4,5. Correct.
  // If length=6, visible=1 => maxIndex=5. indices: 0,1,2,3,4,5. 5 shows doc 5. Correct.

  // NOTE: We need to use state maxIndex derived from the current itemsPerSlide
  const realMaxIndex = hospitalData.doctors.length - itemsPerSlide;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= realMaxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? realMaxIndex : prev - 1));
  };

  // TOUCH HANDLERS
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  
  return (
    <div className="home-root">

      {/* ================= HERO ================= */}
      {/* ================= HERO ================= */}
<section className="hero hero-bg-slider">

  {/* Background slider */}
  <div className="hero-bg-wrapper">
    {HERO_IMAGES.map((img, index) => (
      <motion.div
        key={index}
        className="hero-bg-slide"
        style={{ backgroundImage: `url(${img})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: index === heroIndex ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
    ))}
  </div>

  {/* Dark overlay */}
  <div className="hero-overlay" />

  {/* Content */}
<div className="hero-content-overlay">
<div className="hero-container">
          {/* LEFT */}
          <Reveal direction="top">
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
          {/* RIGHT IMAGE */}
        

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
      <Reveal direction="top">
 
<section className="section section-light">
  <div className="container">
    <SectionTitle>World-Class Facilities</SectionTitle>

    <div className="facilities-wrap">

      {/* LEFT LIST */}
      <div className="facilities-list">
        {hospitalData.facilities.slice(0, 3).map((fac, idx) => {
          const IconComp = FACILITY_ICONS[fac.icon] || Stethoscope;

          return (
            <div
              key={idx}
              className={`facility-row ${activeFacility === idx ? "active" : ""}`}
              onMouseEnter={() => setActiveFacility(idx)}
            >
              <div className="facility-left">
                <div className="facility-icon">
                  <IconComp size={28} />
                </div>
                <h4>{fac.title}</h4>
              </div>

              <div className="facility-right">
                <span className="facility-index">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="facility-arrow">↗</span>
              </div>

              <div className="facility-line" />
            </div>
          );
        })}
      </div>

      {/* RIGHT IMAGE PREVIEW */}
     {/* RIGHT IMAGE PREVIEW (DESKTOP) */}
<div className="facility-preview desktop-only">
  <img src={FACILITY_IMAGES[activeFacility]} alt="Facility preview" />
</div>

{/* MOBILE SLIDER */}
<div className="facility-preview-mobile mobile-only">
  <img
    src={FACILITY_IMAGES[facilityMobileIndex]}
    alt="Facility preview"
  />

  <div className="facility-mobile-dots">
    {FACILITY_IMAGES.map((_, i) => (
      <span
        key={i}
        className={i === facilityMobileIndex ? "active" : ""}
        onClick={() => setFacilityMobileIndex(i)}
      />
    ))}
  </div>
</div>
    </div>
  </div>
</section>
      </Reveal>

      {/* ================= DOCTORS ================= */}
      <Reveal direction="top">
       {/* ================= DOCTORS SHOWCASE (TESTIMONIAL STYLE) ================= */}
<section className="section container doctors-showcase">

  <div className="doctors-showcase-header">
    <h2 className="doctors-title">
      Meet Our Specialists
    </h2>
  </div>

  <div className="doctors-showcase-layout">

    {/* LEFT CONTENT CARD */}
    <div className="doctor-info-card">

      <span className="doctor-tag">
        Specialist Doctor
      </span>

      <h3 className="doctor-name">
        {hospitalData.doctors[doctorIndex].name}
      </h3>

      <p className="doctor-role-big">
        {hospitalData.doctors[doctorIndex].specialty}
      </p>

      <p className="doctor-desc">
        {hospitalData.doctors[doctorIndex].bio || "Highly experienced specialist providing world-class medical care with compassion and precision."}
      </p>

    </div>
<div className="doctor-nav-buttons mobile-only">
<button onClick={prevDoctor}>←</button>
<button onClick={nextDoctor}>→</button>
</div>
    {/* RIGHT IMAGE */}
    <div className="doctor-image-big">
      <img
        src={hospitalData.doctors[doctorIndex].image}
        alt={hospitalData.doctors[doctorIndex].name}
      />
    </div>

    {/* RIGHT SIDE NAME + ARROWS */}
    <div className="doctor-side-info">

      <h4>{hospitalData.doctors[doctorIndex].name}</h4>
      <p>{hospitalData.doctors[doctorIndex].specialty}</p>

      <div className="doctor-nav-buttons">
      <button onClick={prevDoctor}>←</button>
<button onClick={nextDoctor}>→</button>
      </div>

    </div>



  </div>

</section>
      </Reveal>

      {/* ================= TESTIMONIALS ================= */}
      {/* ================= TESTIMONIALS ================= */}
      <Reveal direction="top">
        {/* ================= TESTIMONIAL SHOWCASE ================= */}
<section className="section container testimonial-showcase">


{t && (
  <section className="section container testimonial-showcase">

    <h2 className="testimonial-title">
      Hear from our patients
    </h2>

    <div className="testimonial-layout">

      {/* LEFT IMAGE */}
      <div className="testimonial-image">
        <img src={t.image} alt={t.name} />
      </div>

      {/* RIGHT CONTENT */}
      <div className="testimonial-content-box">

        <h3 className="testimonial-heading">
          {t.headline || "Around-the-clock care delivered with compassion"}
        </h3>

        <div className="testimonial-quote-box">
          <p className="testimonial-quote-text">
            “{t.text}”
          </p>

          <div className="testimonial-person">
            <strong>{t.name}</strong>
            <span>{t.role}</span>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div className="testimonial-nav">
          <button onClick={prevTestimonial}>←</button>
          <button onClick={nextTestimonial}>→</button>
        </div>

      </div>

    </div>

  </section>
)}

</section>
      </Reveal>
      <Reveal direction="top">
         <section className="contact-mini">
        <div className="container contact-mini-grid">

          {/* LEFT FORM */}
          <div className="contact-mini-form">
            <div className="contact-mini-tag">CONTACT US</div>
            <h2>Book Appointment</h2>

            <form>
              <div className="row">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>

              <div className="row">
                <input type="tel" placeholder="Your Mobile Number" />
                <input type="tel" placeholder="Your Alternative Number" />
              </div>

              <textarea placeholder="Write your message"></textarea>

              <Link to="/contact-us" className="cta-eldiora">
                <span className="cta-label">Contact Us</span>
                <span className="cta-dot">
                  <span className="cta-arrow">↗</span>
                </span>
              </Link>
            </form>
          </div>

          {/* RIGHT MAP */}
          <div className="contact-mini-map">
            <iframe
              src="https://www.google.com/maps?q=kochi&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>
      </Reveal>
    </div>
  );
};

export default Home;
