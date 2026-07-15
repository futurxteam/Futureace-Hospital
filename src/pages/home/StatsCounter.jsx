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

    const duration = 1500;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
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
    { label: "Specialist Doctors", value: 100, suffix: "+", icon: UserRound, color: "#e0f2fe" },
    { label: "Happy Patients", value: 58000, suffix: "+", icon: Users, color: "#f0fdf4" },
    { label: "Surgeries Done", value: 5000, suffix: "+", icon: Award, color: "#fef2f2" },
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
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
