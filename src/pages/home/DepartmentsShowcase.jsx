import { useState } from "react";
import * as Icons from "lucide-react";
import { hospitalData } from "../../data/hospitalData";
import "../style/DepartmentsShowcase.css";
import Reveal from "../../components/Reveal";
import { useNavigate } from "react-router-dom";

export default function DepartmentsShowcase() {
  const navigate = useNavigate();

  return (
    <section className="dept-showcase">
      <div className="dept-layout">
        <div className="dept-list">
          <Reveal direction="bottom">
            <h2 className="section-title">Our Departments</h2>
          </Reveal>

          {hospitalData.departments.map((dept, index) => {
            const Icon = Icons[dept.icon] || Icons.Activity;

            return (
              <Reveal key={dept.id} direction="top" >
                <div
                  className="dept-item-wrapper"
                  onClick={() => navigate("/services")}
                  style={{ cursor: "pointer" }}
                >
                  {/* LEFT: Icon + Text */}
                  <div className="dept-content">
                    <div
                      className="dept-icon"
                      style={{ background: dept.color }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="dept-text">
                      <h4>{dept.title}</h4>
                      <p>{dept.description}</p>
                    </div>
                  </div>

                  {/* RIGHT: Small Image */}
                  <div className="dept-image-small">
                    <img src={dept.image} alt={dept.title} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
