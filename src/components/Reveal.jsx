import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal animation
 * direction: "up" | "down" | "left" | "right"
 * default = "up"
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 50,
  direction = "up",
  duration = 0.7,
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
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

