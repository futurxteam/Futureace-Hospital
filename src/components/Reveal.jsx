import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal animation
 * direction: "up" | "down" | "left" | "right"
 * default = "up"
 *
 * Premium easing curve: custom spring-like cubic-bezier
 * Reduced distance for subtlety, GPU-accelerated via will-change
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 30,
  direction = "up",
  duration = 0.8,
  className = "",
}) {
  let initial = { opacity: 0 };

  switch (direction) {
    case "down":
      initial.y = -distance;
      break;
    case "left":
      initial.x = distance;
      break;
    case "right":
      initial.x = -distance;
      break;
    case "top":
    case "up":
    default:
      initial.y = distance;
      break;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
