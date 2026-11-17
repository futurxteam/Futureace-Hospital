import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        altPhone: "",
        message: "",
        privacyConsent: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const { name, phone, message, privacyConsent } = formData;

        // Basic Validation
        if (!name.trim() || !phone.trim()) {
            setError("Please provide both your name and mobile number.");
            return;
        }

        if (!privacyConsent) {
            setError("Please read and agree to the Privacy Policy and Terms & Conditions.");
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
            message: "",
            privacyConsent: false,
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

            {/* Privacy Consent Checkbox */}
            <div style={{ margin: "1rem 0" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handleChange}
                        required
                        style={{ marginTop: "3px", width: "18px", height: "18px", accentColor: "#00b4d8", cursor: "pointer", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>
                        I have read and agree to the{" "}
                        <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#0284c7", textDecoration: "underline", fontWeight: 600 }}>
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer" style={{ color: "#0284c7", textDecoration: "underline", fontWeight: 600 }}>
                            Terms &amp; Conditions
                        </Link>.
                    </span>
                </label>
            </div>

            {error && (
                <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem", fontWeight: 500 }} role="alert">
                    {error}
                </div>
            )}

            <button type="submit" className="cta-eldiora">
                <span className="cta-label">Contact Us</span>
                <span className="cta-dot">
                    <span className="cta-arrow">↗</span>
                </span>
            </button>
        </form>
    );
}