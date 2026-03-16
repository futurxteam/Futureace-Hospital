import React from "react";
import { motion } from "framer-motion";
import { hospitalData } from "../data/hospitalData";
import { Award, BookOpen, User } from "lucide-react";

const Doctors = () => {
  const isMobile = window.innerWidth < 600;

  return (
    <div style={{ background: "#f8fafc", overflowX: "hidden" }}>

      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "420px",
          backgroundImage: "url(/doctors.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
          }}
        />

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
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            World-Class Specialists
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.95 }}>
            Meet our team of expert doctors dedicated to providing personalized and compassionate care.
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section style={{ padding: "60px 0" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              width: "100%",
            }}
          >
            {hospitalData.doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  padding: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {/* CARD LAYOUT */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "center" : "flex-start",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      width: isMobile ? "140px" : "120px",
                      height: isMobile ? "140px" : "120px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      flexShrink: 0,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
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

                  {/* CONTENT */}
                  <div style={{ flex: 1, width: "100%" }}>
                    {/* TOP ROW */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "flex-start",
                        gap: "8px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <h2
                          style={{
                            fontSize: "20px",
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
                            fontSize: "14px",
                          }}
                        >
                          {doctor.specialty}
                        </p>
                      </div>

                      {/* BUTTON */}
                      <button
                        style={{
                          alignSelf: isMobile ? "flex-end" : "flex-start",
                          padding: "6px 16px",
                          borderRadius: "999px",
                          border: "none",
                          minWidth: "72px",
                          background: "#2563eb",
                          color: "white",
                          fontWeight: 600,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          boxShadow: "0 6px 16px rgba(37,99,235,0.35)",
                        }}
                      >
                        Book
                      </button>
                    </div>

                    {/* BIO */}
                    <p
                      style={{
                        color: "#475569",
                        lineHeight: 1.6,
                        marginTop: "12px",
                        marginBottom: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {doctor.bio}
                    </p>

                    {/* META */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#64748b",
                      }}
                    >
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Award size={14} /> {doctor.experience}
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <BookOpen size={14} /> {doctor.qualification}
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <User size={14} /> {doctor.languages}
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