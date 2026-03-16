import React, { useState, useEffect } from "react";
import { Stethoscope, MonitorPlay, HeartPulse, Armchair } from "lucide-react";
import { hospitalData } from "../data/hospitalData";
import SectionHeader from "./SectionHeader";

const FACILITY_ICONS = {
  Stethoscope,
  MonitorPlay,
  HeartPulse,
  Armchair,
};

const FACILITY_IMAGES = [
  "/section1.png",
  "/section2.png",
  "/section3.png",
];

export default function FacilitiesSection() {
  const [activeFacility, setActiveFacility] = useState(0);
  const [facilityMobileIndex, setFacilityMobileIndex] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 900) return;
    const interval = setInterval(() => {
      setFacilityMobileIndex((prev) => (prev + 1) % FACILITY_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section section-light">
      <div className="container">
        <SectionHeader subtitle="Care Facilities" title="World-Class Facilities" />

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
  );
}
