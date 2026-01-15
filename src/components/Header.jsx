import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 px-2 md:px-4 py-4 md:py-6"
            >
                <div className="glass-panel container mx-auto rounded-[999px] flex items-center justify-between px-4 md:px-10 py-3 md:py-7"
                    style={{ borderRadius: '999px', maxWidth: '1500px' }}>

                    {/* Logo */}
                    <Link to="/" className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 no-underline z-50 relative">
                        Futureace<span className="text-blue-brand">.</span>
                    </Link>

                    {/* Desktop Navigation */}
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

                    {/* Desktop CTA Button */}
                    <Link to="/contact" className="hidden md-flex btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
                        Book Appointment
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md-hidden flex items-center justify-center p-2 text-gray-600 hover:text-blue-brand transition-colors z-50 relative"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dimmed Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 md-hidden"
                            style={{
                                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(3px)',
                                display: 'block',
                                zIndex: 9998
                            }}
                        />

                        {/* Sidebar Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="md-hidden"
                            style={{
                                position: 'fixed', top: 0, right: 0, bottom: 0,
                                width: '80%', maxWidth: '300px',
                                background: 'white',
                                boxShadow: '-5px 0 25px rgba(0,0,0,0.2)',
                                padding: '2rem',
                                display: 'flex', flexDirection: 'column',
                                gap: '2rem',
                                overflowY: 'auto',
                                zIndex: 9999
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}>
                                    <X size={32} className="text-gray-600" />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                                {['Home', 'About Us', 'Specialities', 'Doctors', 'Contact Us'].map((item) => (
                                    <Link
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-xl font-bold text-gray-800 hover-text-brand"
                                        onClick={() => setIsOpen(false)}
                                        style={{ textDecoration: 'none', fontSize: '1.25rem', fontWeight: 600, color: '#374151', width: '100%' }}
                                    >
                                        {item}
                                    </Link>
                                ))}

                                <Link
                                    to="/contact"
                                    className="btn-primary"
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        textDecoration: 'none',
                                        padding: '0.9rem 2rem',
                                        width: '100%',
                                        textAlign: 'center',
                                        marginTop: '1rem',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
