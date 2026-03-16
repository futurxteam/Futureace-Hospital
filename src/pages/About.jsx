import { useEffect, useState } from "react";
import { hospitalData } from "../data/hospitalData";
import { Stethoscope, MonitorPlay, HeartPulse, Armchair } from "lucide-react";
import "../pages/style/Home.css";
import { motion } from "framer-motion";
import "../pages/style/About.css";
/* Reuse your SectionTitle or inline */
const SectionTitle = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="section-title"
  >
    {children}
  </motion.h2>
);

export default function About() {
  const FACILITY_IMAGES = [
    "/section1.png",
    "/section2.png",
    "/section3.png",
  ];

  const [activeFacility, setActiveFacility] = useState(0);
  const [facilityMobileIndex, setFacilityMobileIndex] = useState(0);

  const FACILITY_ICONS = {
    Stethoscope,
    MonitorPlay,
    HeartPulse,
    Armchair,
  };

  // Auto slide on mobile
  useEffect(() => {
    if (window.innerWidth > 900) return;

    const interval = setInterval(() => {
      setFacilityMobileIndex((prev) => (prev + 1) % FACILITY_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      {/* ================= ABOUT HERO ================= */}
<section
className="about-hero"
style={{ backgroundImage: "url(/about.jpg)" }}
>
<div className="about-hero-overlay" />


<div className="about-hero-content">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
>
World-Class Healthcare,<br />Built Around You
</motion.h1>


<motion.p
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2, duration: 0.6 }}
>
Experience next-generation medical care with compassion, comfort, and cutting-edge technology.
</motion.p>
</div>
</section>
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

          {/* DESKTOP IMAGE */}
          <div className="facility-preview desktop-only">
            <img src={FACILITY_IMAGES[activeFacility]} alt="Facility preview" />
          </div>

          {/* MOBILE SLIDER */}
          <div className="facility-preview-mobile mobile-only">
            <img src={FACILITY_IMAGES[facilityMobileIndex]} alt="Facility preview" />

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
    </div>
  );
}