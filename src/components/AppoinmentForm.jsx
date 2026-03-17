import { useState } from "react";

export default function AppointmentForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        altPhone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = "Appointment Request - Futureace Hospital";

        const body = `
Name: ${formData.name}
Email: ${formData.email}
Mobile Number: ${formData.phone}
Alternative Number: ${formData.altPhone}

Message:
${formData.message}
`;

        const gmailLink =
            `https://mail.google.com/mail/?view=cm&fs=1` +
            `&to=hello@futureacehospital.com` +
            `&su=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        window.open(gmailLink, "_blank");

        setFormData({
            name: "",
            email: "",
            phone: "",
            altPhone: "",
            message: ""
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="row">
                <input
                    type="tel"
                    name="phone"
                    placeholder="Your Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="altPhone"
                    placeholder="Your Alternative Number"
                    value={formData.altPhone}
                    onChange={handleChange}
                />
            </div>

            <textarea
                name="message"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>

            <button type="submit" className="cta-eldiora">
                <span className="cta-label">Contact Us</span>
                <span className="cta-dot">
                    <span className="cta-arrow">↗</span>
                </span>
            </button>
        </form>
    );
}