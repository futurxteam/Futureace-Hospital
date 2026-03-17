import { motion } from "framer-motion";
import "../pages/style/Home.css";
import "../pages/style/About.css";
import FacilitiesSection from "../components/FacilitiesSection";

export default function About() {
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            World-Class Healthcare,<br />Built Around You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Experience next-generation medical care with compassion, comfort, and cutting-edge technology.
          </motion.p>
        </div>
      </section>

      <FacilitiesSection />
    </div>
  );
}