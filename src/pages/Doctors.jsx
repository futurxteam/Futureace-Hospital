import React from "react";
import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import { Calendar, Award, BookOpen, User } from "lucide-react";

const Doctors = () => {
  return (
    <div style={{ background: "#f8fafc" }}>

      {/* ================= HERO BANNER ================= */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "420px",
          backgroundImage: "url(/doctors.jpg)", // 👈 change if needed
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
            World-Class Specialists
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
            Meet our team of expert doctors dedicated to providing personalized and compassionate care.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section
        style={{
          padding: "100px 0",
        }}
      >
        <div className="container">

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              width: "105%",
            }}
          >
            {hospitalData.doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: "white",
                  borderRadius: "28px",
                  padding: "28px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                }}
              >
                {/* Card Layout */}
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "22px",
                      overflow: "hidden",
                      flexShrink: 0,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    }}
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <h2
                          style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            marginBottom: "4px",
                            color: "#0f172a",
                          }}
                        >
                          {doctor.name}
                        </h2>
                        <p
                          style={{
                            color: "#2563eb",
                            fontWeight: 600,
                            fontSize: "15px",
                          }}
                        >
                          {doctor.specialty}
                        </p>
                      </div>

                  <button
  style={{
    padding: "6px 18px",
    borderRadius: "999px",
    border: "none",
    minWidth: "80px",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    marginLeft: "auto",
    boxShadow: "0 6px 16px rgba(37,99,235,0.35)",
    transition: "all 0.25s ease",
  }}
>
  Book
</button>
                    </div>

                    <p
                      style={{
                        color: "#475569",
                        lineHeight: 1.6,
                        marginTop: "12px",
                        marginBottom: "16px",
                        fontSize: "14.5px",
                      }}
                    >
                      {doctor.bio}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "10px",
                        fontSize: "14px",
                        color: "#64748b",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Award size={16} /> {doctor.experience}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <BookOpen size={16} /> {doctor.qualification}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <User size={16} /> {doctor.languages}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Doctors;