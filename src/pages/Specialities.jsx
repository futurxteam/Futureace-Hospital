import { motion } from "framer-motion";
import DepartmentsShowcase from "./home/DepartmentsShowcase";

export default function Specialities() {
  return (
    <div style={{ background: "#f8fafc" }}>

      {/* ================= HERO BANNER ================= */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "420px",
          backgroundImage: "url(/dept.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            padding: "0 24px",
            maxWidth: "900px",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            Our Specialities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "18px",
              opacity: 0.95,
            }}
          >
            Comprehensive care across multiple specialties with world-class doctors and facilities.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section
        style={{
          padding: "100px 0",
        }}
      >
        <DepartmentsShowcase />
      </section>

    </div>
  );
}