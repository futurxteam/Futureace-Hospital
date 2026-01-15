import React from 'react';
import { motion } from 'framer-motion';
import { hospitalData } from '../data/hospitalData';
import { Calendar, Award, BookOpen, User } from 'lucide-react';

const Doctors = () => {
    return (
        <div style={{ paddingTop: '140px', paddingBottom: '4rem' }} className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                    World-Class Specialists
                </h1>
                <p style={{ color: '#6b7280', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Meet our team of expert doctors dedicated to providing personalized and compassionate care.
                </p>
            </motion.div>

            <div className="grid md-grid-2" style={{ gap: '3rem' }}>
                {hospitalData.doctors.map((doctor, index) => (
                    <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            display: 'flex',
                            flexDirection: 'column', // Mobile first
                            gap: '1.5rem',
                            padding: '2rem',
                            borderRadius: '32px',
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Desktop Layout override via style if needed, but flex wrap/media queries logic is better. 
                             Using simple flex column first for safety, then row on desktop via query check or class */}
                        <div className="md-flex" style={{ gap: '2rem', alignItems: 'start' }}>
                            <div style={{ flexShrink: 0 }}>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '30px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-lg)'
                                }}>
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1f2937' }}>{doctor.name}</h2>
                                        <p className="text-purple" style={{ fontWeight: 600, fontSize: '1.1rem' }}>{doctor.specialty}</p>
                                    </div>
                                    <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Book Now</button>
                                </div>

                                <p style={{ color: '#4b5563', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    {doctor.bio}
                                </p>

                                <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                                    <div className="flex items-center" style={{ gap: '0.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                                        <Award size={18} className="text-purple" />
                                        <span>{doctor.experience} Exp.</span>
                                    </div>
                                    <div className="flex items-center" style={{ gap: '0.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                                        <BookOpen size={18} className="text-purple" />
                                        <span>{doctor.qualification}</span>
                                    </div>
                                    <div className="flex items-center" style={{ gap: '0.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                                        <User size={18} className="text-purple" />
                                        <span>{doctor.languages}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;
