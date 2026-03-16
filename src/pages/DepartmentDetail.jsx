import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { hospitalData } from "../data/hospitalData";
import Reveal from "../components/Reveal";
import "./style/DepartmentDetail.css";

const DepartmentDetail = () => {
  const { id } = useParams();
  const department = hospitalData.departments.find((d) => d.id === parseInt(id));
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!department) {
    return (
      <div className="container" style={{ paddingTop: "150px", textAlign: "center", minHeight: "60vh" }}>
        <h2>Department Not Found</h2>
        <Link to="/" className="btn-back">Return Home</Link>
      </div>
    );
  }

  const Icon = Icons[department.icon] || Icons.Activity;

  return (
    <div className="dept-detail-root">
      {/* Hero Header */}
      <section className="dept-detail-hero" style={{ background: `linear-gradient(135deg, ${department.color} 0%, #ffffff 100%)` }}>
        <div className="container">
          <div className="dept-hero-content">
            <Reveal direction="down">
              <div className="dept-hero-text">
                <Link to="/" className="back-link">
                  <Icons.ArrowLeft size={20} /> Back to Home
                </Link>
                <div className="dept-title-wrap">
                  <div className="dept-hero-icon" style={{ backgroundColor: "#ffffff" }}>
                    <Icon size={40} color="#1e40af" />
                  </div>
                  <div>
                    <h1>{department.title}</h1>
                    {department.tagline && <p className="dept-tagline">{department.tagline}</p>}
                  </div>
                </div>
                {department.patientThought && (
                  <div className="patient-thought-box">
                    <Icons.Quote size={24} className="quote-icon" />
                    <p className="quote-text">{department.patientThought.quote}</p>
                    <span className="quote-attr">— {department.patientThought.attribution}</span>
                  </div>
                )}
              </div>
            </Reveal>
            <Reveal direction="down" delay={0.2}>
              <div className="dept-hero-image">
                <img src={department.image} alt={department.title} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro Description */}
      <section className="dept-intro-section container">
        <div className="dept-intro-grid">
          <Reveal direction="down">
            <div className="intro-text-wrap">
              <h2>Our Promise</h2>
              <p>{department.longDescription || department.description}</p>
              {department.philosophy && <p className="philosophy-text">{department.philosophy}</p>}
            </div>
          </Reveal>
          
          {department.whyChoose && (
            <Reveal direction="down" delay={0.2}>
              <div className="why-choose-grid">
                {department.whyChoose.map((item, i) => (
                  <div key={i} className="why-item">
                    <div className="why-dot"></div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Surgeries Section */}
      <section className="dept-surgeries-section container">
        <Reveal direction="down">
          <div className="surgeries-header">
            <h2>Services & Procedures</h2>
            <p>Click on a category to explore detailed procedures and our approach.</p>
          </div>
        </Reveal>

        <div className="service-categories-list">
          {department.serviceCategories ? (
            department.serviceCategories.map((cat, idx) => (
              <Reveal key={idx} direction="down" delay={idx * 0.1}>
                <div className={`service-cat-card ${expandedIndex === idx ? 'expanded' : ''}`}>
                  <div 
                    className="service-cat-header" 
                    onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  >
                    <div className="header-main">
                      <span className="cat-number">0{idx + 1}</span>
                      <div>
                        <h3>{cat.title}</h3>
                        <p>{cat.subtitle}</p>
                      </div>
                    </div>
                    <Icons.ChevronDown className={`chevron ${expandedIndex === idx ? 'rotate' : ''}`} />
                  </div>
                  
                  <motion.div 
                    className="service-cat-body"
                    initial={false}
                    animate={{ height: expandedIndex === idx ? 'auto' : 0, opacity: expandedIndex === idx ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="cat-body-content">
                      <div className="cat-story-box">
                        <p className="story-text">"{cat.story}"</p>
                      </div>
                      <div className="procedures-detail-grid">
                        {cat.procedures.map((p, pi) => (
                          <div key={pi} className="procedure-detail-item">
                            <h4>{p.name}</h4>
                            <p>{p.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))
          ) : (
            <div className="surgeries-grid">
               {department.surgeries && department.surgeries.map((surgery, index) => (
                <Reveal key={index} direction="down" delay={index * 0.05}>
                  <div className="surgery-card">
                    <div className="surgery-dot"></div>
                    <span className="surgery-name">{surgery}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="dept-cta-section container">
        <Reveal direction="down">
          <div className="dept-cta-card">
            <h2>Ready to feel like yourself again?</h2>
            <p>Your journey begins with a private, unhurried conversation—no pressure, just clarity.</p>
            <Link to="/contact-us" className="btn-cta-large">
              Book a Planned Consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default DepartmentDetail;
