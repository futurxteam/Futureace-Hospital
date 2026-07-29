import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { hospitalData } from "../../data/hospitalData";
import "../style/DepartmentsShowcase.css";
import Reveal from "../../components/Reveal";

export default function DepartmentsShowcase() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Surgical", "Clinical", "Wellness"];

  const filteredDepts = filter === "All"
    ? hospitalData.departments
    : hospitalData.departments.filter(d => d.category === filter);

  /* 
   * Premium stagger animation — uses opacity + translateY only
   * Avoids scale transforms which cause layout thrashing in grids
   */
  const item = {
    hidden: { 
      opacity: 0, 
      y: 24,
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
      } 
    },
    exit: { 
      opacity: 0, 
      y: -12,
      transition: { 
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      } 
    }
  };

  const handleFilter = useCallback((cat) => {
    setFilter(cat);
  }, []);

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
            onClick={() => handleFilter(cat)}
          >
            {cat}
            {filter === cat && (
              <motion.div
                layoutId="activeTab"
                className="active-indicator"
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 35,
                  mass: 0.8,
                }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="dept-grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="dept-grid-inner"
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ staggerChildren: 0.06 }}
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1, 
                transition: { staggerChildren: 0.06 } 
              },
              exit: { 
                opacity: 0,
                transition: { staggerChildren: 0.03, staggerDirection: -1 } 
              },
            }}
          >
            {filteredDepts.map((dept) => {
              const Icon = Icons[dept.icon] || Icons.Activity;

              return (
                <motion.div
                  variants={item}
                  key={dept.id}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link to={`/department/${dept.id}`} className="dept-card">
                    <div className="dept-card-inner">
                      <div className="dept-card-image">
                        <img src={dept.image} alt={dept.title} loading="lazy" />
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
