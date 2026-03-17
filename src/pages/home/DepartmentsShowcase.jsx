import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { hospitalData } from "../../data/hospitalData";
import "../style/DepartmentsShowcase.css";
import Reveal from "../../components/Reveal";
import { useNavigate } from "react-router-dom";

export default function DepartmentsShowcase() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Surgical", "Clinical", "Wellness"];

  const filteredDepts = filter === "All"
    ? hospitalData.departments
    : hospitalData.departments.filter(d => d.category === filter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      } 
    }
  };

  return (
    <section className="dept-grid-section container">
      <Reveal direction="down">
        <div className="section-header-centered">
          <span className="section-subtitle">Excellence in Care</span>
          <h2 className="section-title">Specialized Departments</h2>
          <p className="section-description">
            Experience world-class medical expertise across our boutique facilities,
            designed for your comfort and rapid recovery.
          </p>
        </div>
      </Reveal>

      {/* FILTER TABS */}
      <div className="filter-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
            {filter === cat && (
              <motion.div
                layoutId="activeTab"
                className="active-indicator"
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="dept-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence mode="popLayout">
          {filteredDepts.map((dept) => {
            const Icon = Icons[dept.icon] || Icons.Activity;

            return (
              <motion.div
                layout
                variants={item}
                initial="hidden"
                animate="show"
                exit="exit"
                key={dept.id}
              >
                <Link to={`/department/${dept.id}`} className="dept-card">
                  <div className="dept-card-inner">
                    <div className="dept-card-image">
                      <img src={dept.image} alt={dept.title} />
                      <div className="dept-card-tag">{dept.category}</div>
                      <div className="dept-card-overlay"></div>
                    </div>

                    <div className="dept-card-content">
                      <div
                        className="dept-card-icon"
                        style={{ background: dept.color, color: "#1e40af" }}
                      >
                        <Icon size={24} />
                      </div>

                      <h3>{dept.title}</h3>
                      <p>{dept.description}</p>

                      <div className="dept-card-footer">
                        <span className="view-more-text">Explore Procedures</span>
                        <Icons.ChevronRight size={18} className="arrow-icon" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
