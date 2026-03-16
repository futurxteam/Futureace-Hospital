import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UserRound, Users, Bed, Award } from "lucide-react";
import "../style/StatsCounter.css";

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const stats = [
    { label: "Specialist Doctors", value: 50, suffix: "+", icon: UserRound, color: "#e0f2fe" },
    { label: "Happy Patients", value: 58000, suffix: "+", icon: Users, color: "#f0fdf4" },
    { label: "Premium Beds", value: 100, suffix: "+", icon: Bed, color: "#fef2f2" },
    { label: "Excellence Awards", value: 15, suffix: "+", icon: Award, color: "#fff7ed" },
  ];

  return (
    <section className="stats-section">
      <div className="container stats-grid">
        {stats.map((stat, i) => {
          const IconComp = stat.icon;
          return (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div 
                className="stat-icon-box" 
                style={{ backgroundColor: stat.color }}
              >
                <IconComp size={24} className="stat-icon" />
              </div>
              <div className="stat-info">
                <div className="stat-number">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
