import React from "react";
import "../pages/style/AboutUs.css";
import Reveal from "./Reveal";

export default function AboutFutureace() {
    return (
        <div className="about-page">

            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <Reveal>
                        <h1>About Futureace</h1>
                        <p>A Boutique Hospital for Thoughtfully Planned Care</p>
                    </Reveal>
                </div>
            </section>

            {/* Introduction */}
            <section className="about-intro container">
                <Reveal>
                    <p>
                        In a world where hospitals have become mechanised, queues stretch
                        endlessly, and patients are reduced to case numbers, Futureace was
                        created to rewrite that story.
                    </p>
                </Reveal>

                <Reveal delay={0.2}>
                    <p>
                        Futureace is not a typical hospital. It is India’s first dedicated
                        boutique surgical hub, NABH certified and founded on a simple promise:
                        your time, trust, and comfort deserve as much respect as your health
                        itself.
                    </p>
                </Reveal>

                <Reveal delay={0.4}>
                    <p>
                        We combine world-class surgical expertise with personalised care and
                        hospitality. Every consultation, diagnosis, and procedure is carefully
                        scheduled and organised around the patient, ensuring a calm, seamless,
                        and dignified healing journey.
                    </p>
                </Reveal>
            </section>

            {/* Philosophy */}
            <section className="about-philosophy">
                <div className="container">
                    <Reveal>
                        <h2>Our Philosophy</h2>
                        <p>
                            At Futureace, we do not believe healthcare miracles should be rare.
                            Healing should happen through careful planning, meticulous preparation,
                            and uncompromising ethics. Instead of chaos and unpredictability, we
                            create an environment where care is organised, respectful, and focused
                            entirely on the patient.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Mission Vision */}
            <section className="mission-vision container">
                <Reveal direction="left">
                    <div className="mission">
                        <h2>Our Mission</h2>
                        <p>
                            To heal with respect by eliminating the chaos of traditional
                            healthcare and delivering planned, personalised, patient-first care
                            in an exclusive boutique setting.
                        </p>
                    </div>
                </Reveal>

                <Reveal direction="right">
                    <div className="vision">
                        <h2>Our Vision</h2>
                        <p>
                            To redefine trust in Kerala’s healthcare by creating chaos-free,
                            premium super-speciality hubs where patients experience care that is
                            meaningful, efficient, transparent, and deeply personal.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Values */}
            <section className="values">
                <div className="container">
                    <Reveal>
                        <h2>Our Values</h2>
                    </Reveal>

                    <div className="values-grid">
                        <Reveal delay={0.1}>
                            <div className="value">
                                <h4>Respect for Everyone’s Time</h4>
                                <p>Every moment of care is meaningful—organised, calm, and never rushed.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="value">
                                <h4>Ethical Excellence</h4>
                                <p>No unnecessary tests or forced prescriptions—only what is truly needed for healing.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="value">
                                <h4>Clarity, Not Chaos</h4>
                                <p>Transparent pricing, predictable schedules, and honest communication.</p>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={0.4}>
                            <div className="value">
                                <h4>Personalised Care</h4>
                                <p>Every patient is treated with dignity and individual attention.</p>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={0.5}>
                            <div className="value">
                                <h4>Collaboration with Experts</h4>
                                <p>We partner with leading specialists to provide exceptional expertise under one roof.</p>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={0.6}>
                            <div className="value">
                                <h4>Care Practised, Not Promised</h4>
                                <p>Healing happens best in peace and comfort, and our systems are designed to make that possible.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Why Futureace */}
            <section className="why-futureace container">
                <Reveal>
                    <h2>Why Futureace?</h2>
                    <p className="subtitle">
                        Because good healthcare shouldn’t feel like a privilege.
                    </p>
                </Reveal>

                <Reveal delay={0.2}>
                    <p>
                        Think about the experience of visiting a boutique or salon—you are
                        greeted warmly, offered comfort, and given undivided attention. Yet in
                        many hospitals, patients receive a token number, wait for hours, and
                        have only a few rushed minutes with their doctor.
                    </p>
                </Reveal>

                <Reveal delay={0.3}>
                    <p>
                        At Futureace, we believe healthcare should be different. Our system is
                        designed to prioritise both the patient’s wellbeing and the doctor’s
                        time. Appointments, diagnostics, and surgical care are synchronised so
                        that your experience is organised, respectful, and stress-free.
                    </p>
                </Reveal>
            </section>

            {/* Experience Section */}
            <section className="futureace-experience">
                <div className="container">
                    <Reveal>
                        <h2>The Futureace Experience</h2>
                    </Reveal>

                    <div className="experience-grid">
                        <Reveal delay={0.1}>
                            <div>
                                <h4>Boutique & Personal</h4>
                                <p>A premium experience where every patient receives personalised attention.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div>
                                <h4>Planned & Peaceful</h4>
                                <p>A dedicated hub for scheduled care without emergency disruptions.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div>
                                <h4>Ethical by Design</h4>
                                <p>Doctors practise need-based medicine without quotas or pressure.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div>
                                <h4>Transparent & Trustworthy</h4>
                                <p>Every test, procedure, and cost is clearly explained.</p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

        </div>
    );
}