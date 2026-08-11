import "./AppointmentSection.css";
import AppointmentForm from "./AppoinmentForm";

export default function AppointmentSection() {
  return (
    <div className="contact-page">

      {/* ================= CONTACT HERO ================= */}
      <section
        className="contact-hero"
        style={{ backgroundImage: "url(/contact.webp)" }}
      >
        <div className="contact-hero-overlay" />

        <div className="contact-hero-content"> 
          <h1>Book an Appointment</h1>
          <p>We’re here to help you with world-class care and personal attention.</p>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section className="contact-info-section">
        <div className="container info-cards-grid">

          <div className="info-card">
            <div className="info-card-icon">📞</div>
            <h3>Call Us</h3>
            <p>484-273-5600</p>
            <p>8589-003-330</p>

          </div>

          <div className="info-card">
            <div className="info-card-icon">✉️</div>
            <h3>Email Us</h3>
            <p>console@futureacehospital.com</p>
          </div>

          <a
            href="https://www.google.com/maps?q=10%C2%B001%2750.3%22N+76%C2%B018%2716.8%22E"
            target="_blank"
            rel="noopener noreferrer"
            className="info-card clickable-card"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div className="info-card-icon">📍</div>
            <h3>Visit Us</h3>
            <p>
              B, C, D, F Ground, 1st Floor, 37/3712, Mamson Royale, Near Lulu Mall,<br />
              Nethaji Nagar, Edapally, Ernakulam-682024, Kerala
            </p>
          </a>

        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="contact-mini">
        <div className="container contact-mini-grid">

          {/* LEFT FORM */}
          <div className="contact-mini-form">
            <div className="contact-mini-tag">CONTACT US</div>
            <h2>Book Appointment</h2>
            <AppointmentForm />
          </div>

          {/* RIGHT MAP */}
          <div className="contact-mini-map">
            <a
              href="https://www.google.com/maps?q=10%C2%B001%2750.3%22N+76%C2%B018%2716.8%22E"
              target="_blank"
              rel="noopener noreferrer"
              className="map-overlay-link"
              title="Open in Google Maps"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.053355027814!2d76.30248!3d10.030639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAnMDEnNTAuMyJOIDc2wrAxOCcxNi44IkU!5e0!3m2!1sen!2sin!4v1712740000000!5m2!1sen!2sin"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Futureace Hospital Location"
                style={{ pointerEvents: 'none' }}
              ></iframe>
              <div className="map-click-prompt">Click to view on Google Maps</div>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}