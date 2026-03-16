import "./AppointmentSection.css";
import { Link, useLocation } from "react-router-dom";
export default function AppointmentSection() {
  return (
    <div className="contact-page">

      {/* ================= CONTACT HERO ================= */}
      <section
        className="contact-hero"
        style={{ backgroundImage: "url(/contact.jpg)" }}   // or contact.jpeg if you add later
      >
        <div className="contact-hero-overlay" />

        <div className="contact-hero-content">
          <h1>Book an Appointment</h1>
          <p>We’re here to help you with world-class care and personal attention.</p>
        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="contact-mini">
        <div className="container contact-mini-grid">

          {/* LEFT FORM */}
          <div className="contact-mini-form">
            <div className="contact-mini-tag">CONTACT US</div>
            <h2>Book Appointment</h2>

            <form>
              <div className="row">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
              </div>

              <div className="row">
                <input type="tel" placeholder="Your Mobile Number" />
                <input type="tel" placeholder="Your Alternative Number" />
              </div>

              <textarea placeholder="Write your message"></textarea>

              <Link to="/contact-us" className="cta-eldiora">
                <span className="cta-label">Contact Us</span>
                <span className="cta-dot">
                  <span className="cta-arrow">↗</span>
                </span>
              </Link>
            </form>
          </div>

          {/* RIGHT MAP */}
          <div className="contact-mini-map">
            <iframe
              src="https://www.google.com/maps?q=kochi&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}