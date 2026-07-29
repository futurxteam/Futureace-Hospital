import React from "react";
import { motion } from "framer-motion";

/**
 * Common Section Header for consistent Boutique branding
 */
export default function SectionHeader({ title, subtitle, align = "center", className = "" }) {
  return (
    <div 
      className={`section-header-wrap ${className}`} 
      style={{ textAlign: align, marginBottom: "50px" }}
    >
      {subtitle && <span className="section-subtitle-pill">{subtitle}</span>}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`section-title ${align}`}
        style={{ margin: 0 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
