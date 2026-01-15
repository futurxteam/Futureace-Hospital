import { motion } from "framer-motion";

/**
 * direction: "up" | "down" | "left" | "right"
 * default = "up"
 */
export default function Reveal({
  children,
  delay = 0,
  distance = 40,
  direction = "up",
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
        duration: 0.7,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
