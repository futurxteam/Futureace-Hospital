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

        const { name, phone, message } = formData;

        // Basic Validation
        if (!name.trim() || !phone.trim()) {
            alert("Please provide both your name and mobile number.");
            return;
        }

        const whatsappNumber = "918589003330";
        const text = `Hi, my name is ${name}. I would like to enquire about the hospital. ${message}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, "_blank");

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