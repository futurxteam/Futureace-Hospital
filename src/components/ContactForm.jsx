import "./AppointmentSection.css";
import AppointmentForm from "./AppoinmentForm";

export default function AppointmentSection() {
  return (
    <div className="contact-page">

      {/* ================= CONTACT HERO ================= */}
      <section
        className="contact-hero"
        style={{ backgroundImage: "url(/contact.jpg)" }}
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
            <p>0484 273 5600</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon">✉️</div>
            <h3>Email Us</h3>
            <p>hello@futureacehospital.com</p>
          </div>

          <div className="info-card">
            <div className="info-card-icon">📍</div>
            <h3>Visit Us</h3>
            <p>
              B, C, D, F Ground, 1st Floor, 37/3712, Mamson Royale, Near Lulu Mall,
              Chakkaraparambu Junction, Edapally, Ernakulam-682024, Kerala
            </p>
          </div>

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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.176313219463!2d76.3150259747936!3d9.99820719010646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d853b057867%3A0xc6edfff3f1d3c52e!2sFutureace%20Hospital!5e0!3m2!1sen!2sin!4v1709630000000!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Futureace Hospital Location"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}