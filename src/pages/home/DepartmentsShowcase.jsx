import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { hospitalData } from "../../data/hospitalData";
import "../style/DepartmentsShowcase.css";
import Reveal from "../../components/Reveal";
export default function DepartmentsShowcase() {
  const [active, setActive] = useState(hospitalData.departments[0]);

  const ActiveIcon = Icons[active.icon] || Icons.Activity;

  return (
    <section className="dept-showcase container">
      <div className="dept-layout">

        {/* LEFT LIST */}
          <Reveal direction="left">
        <div className="dept-list">
          
          <h2 className="section-title left">Our Departments</h2>

          {hospitalData.departments.map((dept) => {
            const Icon = Icons[dept.icon] || Icons.Activity;

            return ( 
  <div
  className={`dept-tile ${active.id === dept.id ? "active" : ""}`}
  onClick={() => setActive(dept)}
>

                <div
                  className="dept-icon"
                  style={{ background: dept.color }}
                >
                  <Icon size={26} />
                </div>

                <div>
                  <h4>{dept.title}</h4>
                  <p>{dept.description}</p>
                </div>
              </div>
            );
          })}
        </div>
</Reveal>
        {/* RIGHT VISUAL PANEL */}
        <Reveal direction="right">
        <div className="dept-visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="dept-visual-card"
              style={{ background: active.color }}
             initial={{ opacity: 0, y: 20, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -20, scale: 1.03 }}

              transition={{ duration: 0.35, ease: "easeOut" }}
            >
             <div className="dept-image-frame">
  <img src={active.image} alt={active.title} />
</div>

<h3>{active.title}</h3>
<p>{active.description}</p>

            </motion.div>
          </AnimatePresence>
        </div>
</Reveal>
      </div>
    </section>
  );
}
