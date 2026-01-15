import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Stethoscope, Users, MessageSquare } from 'lucide-react';
import { hospitalData } from '../data/hospitalData';

const SectionTitle = ({ children, align = "center" }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="gradient-text"
        style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
            textAlign: align,
            width: '100%'
        }}
    >
        {children}
    </motion.h2>
);

const Home = () => {
    return (
        <div style={{ paddingTop: '80px' }}>

            {/* Hero Section */}
            <section className="container flex-center" style={{ minHeight: '80vh', position: 'relative' }}>
                <div style={{ flex: 1, zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span style={{
                            background: '#e0f7fa', color: '#0077b6', padding: '0.5rem 1rem',
                            borderRadius: '99px', fontSize: '0.9rem', fontWeight: 600, display: 'inline-block', marginBottom: '1.5rem'
                        }}>
                            South India's First Boutique Hospital
                        </span>
                        <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Healthcare <br />
                            <span className="gradient-text">Re-imagined.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '500px', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Experience white-glove service in a state-of-the-art facility.
                            We treat you like family, not just a patient.
                        </p>
                        <div className="flex" style={{ gap: '1rem' }}>
                            <button className="btn-gradient">Book Appointment</button>
                            <button className="btn" style={{ background: '#f1f5f9', padding: '1rem 2rem', borderRadius: '999px' }}>Explore Departments</button>
                        </div>
                    </motion.div>
                </div>

                {/* Abstract 3D shape (CSS based) */}
                <div className="hidden md-flex" style={{ flex: 1, height: '500px', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{
                            width: '400px', height: '400px',
                            background: 'linear-gradient(45deg, #48cae4, #00b4d8)',
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            filter: 'blur(60px)', opacity: 0.6, position: 'absolute'
                        }}
                    />
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="glass-panel"
                        style={{
                            width: '350px', height: '450px', borderRadius: '40px',
                            position: 'relative', zIndex: 2, overflow: 'hidden',
                            background: 'url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800) center/cover'
                        }}
                    >
                        {/* Overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
                    </motion.div>
                </div>
            </section>

            {/* Departments Section */}
            <section className="container" style={{ padding: '6rem 2rem' }}>
                <SectionTitle>Our Departments</SectionTitle>
                <div className="grid md-grid-2 lg-grid-3" style={{ marginTop: '3rem' }}>
                    {hospitalData.departments.map((dept) => (
                        <motion.div
                            key={dept.id}
                            whileHover={{ y: -10 }}
                            className="glass-panel card-hover"
                            style={{ padding: '2rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.8)', background: `linear-gradient(145deg, #ffffff, ${dept.color})` }}
                        >
                            <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                {/* Icons would go here, simplified for now */}
                                <LayoutGrid size={24} color="#333" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{dept.title}</h3>
                            <p style={{ color: '#666', lineHeight: 1.5 }}>{dept.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Facilities Section */}
            <section style={{ background: '#f8fafc', padding: '6rem 0' }}>
                <div className="container">
                    <SectionTitle>World-Class Facilities</SectionTitle>
                    <div className="grid md-grid-2" style={{ gap: '2rem', marginTop: '3rem' }}>
                        {hospitalData.facilities.map((fac, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1.5rem',
                                    background: 'white', padding: '1.5rem', borderRadius: '24px',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '16px' }}>
                                    <Stethoscope size={28} className="text-purple" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{fac.title}</h4>
                                    <p style={{ color: '#6b7280' }}>{fac.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctors Section - Carousel */}
            <section className="container" style={{ padding: '6rem 2rem', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem' }}>
                    <SectionTitle align="left">Meet Our Specialists</SectionTitle>

                    {/* Carousel Controls (Visual only for now, drag to scroll) */}
                    <div className="hidden md-flex" style={{ gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '50%', background: '#f3f4f6', cursor: 'pointer' }}>←</div>
                        <div style={{ padding: '0.5rem', borderRadius: '50%', background: '#f3f4f6', cursor: 'pointer' }}>→</div>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <motion.div
                    className="flex"
                    style={{
                        gap: '2rem',
                        overflowX: 'auto',
                        paddingBottom: '2rem',
                        cursor: 'grab',
                        scrollSnapType: 'x mandatory'
                    }}
                    whileTap={{ cursor: 'grabbing' }}
                >
                    {hospitalData.doctors.map((doc) => (
                        <motion.div
                            key={doc.id}
                            className="glass-panel"
                            whileHover={{ y: -10 }}
                            style={{
                                minWidth: '280px',
                                maxWidth: '280px',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                scrollSnapAlign: 'start',
                                background: 'white',
                                padding: '1rem'
                            }}
                        >
                            <div style={{
                                width: '100%', height: '260px', borderRadius: '24px', overflow: 'hidden',
                                marginBottom: '1rem', position: 'relative'
                            }}>
                                <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{doc.name}</h3>
                                <p className="text-blue-brand" style={{ fontWeight: 500, marginBottom: '0.5rem' }}>{doc.specialty}</p>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {doc.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '6rem 0', background: 'linear-gradient(to bottom, #ffffff, #e0f7fa)' }}>
                <div className="container">
                    <SectionTitle>Patient Stories</SectionTitle>
                    <div className="grid md-grid-3" style={{ marginTop: '3rem' }}>
                        {hospitalData.testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)',
                                    padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.5)'
                                }}
                            >
                                <div style={{ marginBottom: '1rem', color: '#fbbf24' }}>★★★★★</div>
                                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', color: '#374151' }}>"{t.text}"</p>
                                <div style={{ fontWeight: 700 }}>{t.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
