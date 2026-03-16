import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import SectionHeader from "./SectionHeader";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoctorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Update items to show based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalDoctors = hospitalData.doctors.length;
  const maxIndex = Math.max(0, totalDoctors - itemsToShow);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="section doctors-showcase">
      <div className="container">
        <SectionHeader 
          subtitle="Our Experts" 
          align="center" 
          title="Meet Our Specialists" 
        />

        <div className="doctors-carousel-wrapper">
          <div className="doctors-carousel-window">
            <motion.div 
              className="doctors-carousel-track"
              animate={{ x: `calc(-${currentIndex * (100 / itemsToShow)}% - ${currentIndex * (30 / itemsToShow)}px)` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {hospitalData.doctors.map((doctor, idx) => (
                <div key={idx} className="doctor-card-premium">
                  <div className="doctor-card-image">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-card-info">
                    <h3 className="doctor-card-name">{doctor.name}</h3>
                    <p className="doctor-card-specialty">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Unified Navigation */}
        <div className="carousel-nav">
          <button 
            className="carousel-btn" 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="carousel-btn" 
            onClick={handleNext} 
            disabled={currentIndex >= maxIndex}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

