import React, { useRef } from "react";
import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import SectionHeader from "./SectionHeader";
import { ChevronLeft, ChevronRight, Award, BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function DoctorsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section doctors-showcase">
      <div className="container">
        <div className="doctors-header-row">
          <SectionHeader
            subtitle="Our Experts"
            align="left"
            title="Meet Our Specialists"
          />
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={() => scroll("left")} aria-label="Scroll left">
              <ChevronLeft size={22} />
            </button>
            <button className="carousel-btn" onClick={() => scroll("right")} aria-label="Scroll right">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="doctors-scroll-track" ref={scrollRef}>
          {hospitalData.doctors.map((doctor, idx) => (
            <motion.div
              key={doctor.id || idx}
              className="doctor-card-v2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="doctor-card-v2-layout">
                {/* Image */}
                <div className="doctor-card-v2-img">
                  <img src={doctor.image} alt={doctor.name} />
                </div>

                {/* Content */}
                <div className="doctor-card-v2-content">
                  <div className="doctor-card-v2-top">
                    <div>
                      <h3 className="doctor-card-v2-name">{doctor.name}</h3>
                      <p className="doctor-card-v2-specialty">{doctor.specialty}</p>
                    </div>
                    <Link to="/contact-us" className="doctor-card-v2-book">Book</Link>
                  </div>

                  <p className="doctor-card-v2-bio">
                    {doctor.bio || "Highly experienced specialist providing world-class medical care with compassion and precision."}
                  </p>

                  <div className="doctor-card-v2-meta">
                    {doctor.experience && (
                      <span><Award size={14} /> {doctor.experience}</span>
                    )}
                    {doctor.qualification && (
                      <span><BookOpen size={14} /> {doctor.qualification}</span>
                    )}
                    {doctor.languages && (
                      <span><User size={14} /> {doctor.languages}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
