import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [newsletterStatus, setNewsletterStatus] = useState({ state: 'idle', message: '' });

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setNewsletterStatus({ state: 'error', message: 'Please enter your email address.' });
            return;
        }
        if (!consent) {
            setNewsletterStatus({ state: 'error', message: 'Please agree to the Privacy Policy and Terms & Conditions to subscribe.' });
            return;
        }
        setNewsletterStatus({ state: 'success', message: 'Thank you for subscribing to our health updates!' });
        setEmail('');
        setConsent(false);
    };

    const sitemapLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Specialities', path: '/specialities' },
        { label: 'Doctors', path: '/doctors' },
        { label: 'Health Calculator', path: '/health-calculator' },
        { label: 'Contact Us', path: '/contact-us' },
    ];

    return (
        <footer style={{ background: '#f8fafc', padding: '4rem 0', marginTop: '4rem', borderTop: '1px solid #e2e8f0' }}>
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
                            {sitemapLinks.map(item => (
                                <li key={item.label} style={{ marginBottom: '0.5rem' }}>
                                    <Link to={item.path} className="text-gray" style={{ textDecoration: 'none' }}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>Legal</h3>
                        <ul style={{ listStyle: 'none' }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/privacy-policy" className="text-gray" style={{ textDecoration: 'none' }}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <Link to="/terms-conditions" className="text-gray" style={{ textDecoration: 'none' }}>
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>Newsletter</h3>
                        <form onSubmit={handleNewsletterSubmit}>
                            <div style={{ display: 'flex', background: 'white', padding: '0.5rem', borderRadius: '99px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Your email for newsletter"
                                    style={{ border: 'none', outline: 'none', padding: '0.5rem 1rem', flex: 1, borderRadius: '99px', fontSize: '0.9rem' }}
                                />
                                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                                    Subscribe
                                </button>
                            </div>

                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    id="footer-consent"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    style={{ marginTop: '3px', cursor: 'pointer' }}
                                />
                                <label htmlFor="footer-consent" style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.4, cursor: 'pointer' }}>
                                    I agree to the{' '}
                                    <Link to="/privacy-policy" style={{ color: '#0284c7', textDecoration: 'underline' }}>Privacy Policy</Link>{' '}
                                    and{' '}
                                    <Link to="/terms-conditions" style={{ color: '#0284c7', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>.
                                </label>
                            </div>

                            {newsletterStatus.message && (
                                <p style={{
                                    marginTop: '8px',
                                    fontSize: '0.8rem',
                                    color: newsletterStatus.state === 'error' ? '#ef4444' : '#16a34a'
                                }}>
                                    {newsletterStatus.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Futureace Hospital. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
