import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer style={{ background: '#f8fafc', padding: '4rem 0', marginTop: '4rem' }}>
            <div className="container">
                <div className="grid md-grid-4" style={{ gap: '3rem' }}>
                    <div>
                        <h2 className="text-2xl font-bold" style={{ marginBottom: '1rem' }}>
                            Futureace<span className="text-purple">.</span>
                        </h2>
                        <p className="text-gray" style={{ lineHeight: 1.6 }}>
                            B, C, D, F Ground, 1st Floor, 37/3712, Mamson Royale, Near Lulu Mall,<br />
                            Nethaji Nagar, Edapally, Ernakulam-682024, Kerala<br />
                            Phone: 484-273-5600<br />
                            Mobile: 8589-003-330<br />
                            Email: console@futureacehospital.com
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>Sitemap</h3>
                        <ul style={{ listStyle: 'none' }}>
                            {['Home', 'About Us', 'Specialities', 'Doctors'].map(item => (
                                <li key={item} style={{ marginBottom: '0.5rem' }}>
                                    <a href="#" className="text-gray" style={{ textDecoration: 'none' }}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>Legal</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" className="text-gray" style={{ textDecoration: 'none' }}>Privacy Policy</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" className="text-gray" style={{ textDecoration: 'none' }}>Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>Newsletter</h3>
                        <div style={{ display: 'flex', background: 'white', padding: '0.5rem', borderRadius: '99px', boxShadow: 'var(--shadow-sm)' }}>
                            <input type="email" placeholder="Your email" style={{ border: 'none', outline: 'none', padding: '0.5rem 1rem', flex: 1, borderRadius: '99px' }} />
                            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Subscribe</button>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                    © 2024 Futureace Hospital. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
