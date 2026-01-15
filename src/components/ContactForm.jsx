import "./AppointmentSection.css";

export default function AppointmentSection() {
  return (
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

            <button type="submit" className="btn-gradient">
              Send Request
            </button>

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
  );
}
