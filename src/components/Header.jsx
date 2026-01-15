import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-6"
        >
            <div className="glass-panel container mx-auto rounded-[999px] flex items-center justify-between px-10 py-7"
                style={{ borderRadius: '999px', maxWidth: '1500px' }}> {/* Increased size further */}

                {/* Logo */}
                <Link to="/" className="text-4xl font-bold tracking-tight text-gray-900 no-underline">
                    Futureace<span className="text-blue-brand">.</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md-flex items-center gap-8">
                    {['Home', 'About Us', 'Specialities', 'Doctors', 'Contact Us'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-sm font-medium text-gray hover-text-brand transition-colors"
                            style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
                    Book Appointment
                </Link>
            </div>
        </motion.header>
    );
};

export default Header;
