import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import {
  Stethoscope,
  MonitorPlay,
  HeartPulse,
  Armchair
} from "lucide-react";

const FACILITY_ICONS = {
  Stethoscope,
  MonitorPlay,
  HeartPulse,
  Armchair
};

export default function About() {
  return (
    <section className="section section-light">
      <div className="container">
        <h2 className="section-title">World-Class Facilities</h2>

        <div className="facilities-timeline">
          <div className="timeline-line" />

          {hospitalData.facilities.map((fac, idx) => {
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
  );
}
