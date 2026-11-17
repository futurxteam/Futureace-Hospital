import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    // ── SEO Metadata ──
    document.title = 'Privacy Policy | Futureace Hospital';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Privacy Policy of Futureace Healthcare Private Limited (Futureace Hospital), Edappally, Kochi — how we collect, use, share and protect your personal information.'
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://www.futureacehospital.com/privacy-policy');

    return () => {
      document.title = 'Futureace Hospital';
    };
  }, []);

  return (
    <div className="legal-page-wrapper">
      {/* ── Page Hero ── */}
      <section className="legal-hero" aria-label="Privacy Policy Header">
        <div className="legal-hero-badge">Legal &amp; Compliance</div>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: 28 August 2026</p>
      </section>

      {/* ── Main Legal Content ── */}
      <main className="legal-page-container">
        <div className="legal-nav-pill">
          <span>Looking for our website terms?</span>
          <Link to="/terms-conditions">View Terms &amp; Conditions &rarr;</Link>
        </div>

        <div className="legal-content">
          <p>
            Futureace Healthcare Private Limited, a company having its registered office and hospital premises at Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India, operating as Futureace Hospital (&quot;Futureace&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;), respects your privacy. This Privacy Policy explains how we collect, use, share, store and protect personal information that you provide through our website www.futureacehospital.com, including through our appointment and enquiry forms, online payment facility, patient portal and subscription options.
          </p>
          <p>
            This policy applies to information collected through our website and related digital channels. Medical records created during the course of your treatment at Futureace Hospital are additionally governed by applicable medical records regulations and our internal clinical record-keeping policies.
          </p>
          <p>
            By using our website or submitting your information to us, you consent to the practices described in this policy. Please also review our <Link to="/terms-conditions">Terms &amp; Conditions</Link> for general rules governing your use of our website.
          </p>

          <h2 id="information-we-collect">1. Information We Collect</h2>
          <h3>Information you provide to us</h3>
          <ul>
            <li><strong>Contact and enquiry details</strong> submitted through our website forms, such as your name, phone number, email address, city and the content of your message or query.</li>
            <li><strong>Appointment details</strong>, including your preferred doctor, department, date and time, and any symptoms, medical history or health-related notes you choose to share with us voluntarily.</li>
            <li><strong>Patient portal information</strong>, where you register for an account to view reports, access health records or book teleconsultations. This includes your login credentials, patient identification number and the records associated with your account.</li>
            <li><strong>Payment information</strong>, where you pay a bill or a consultation fee online. Card and banking details are collected and processed directly by our payment gateway partner and are not stored on our servers.</li>
            <li><strong>Subscription details</strong>, where you opt in to receive health updates, newsletters or WhatsApp communications from us.</li>
          </ul>

          <h3>Information we collect automatically</h3>
          <ul>
            <li><strong>Technical and usage data</strong> recorded in our server logs and analytics tools, such as your browser type, device and operating system, IP address, approximate location, pages viewed, referring website and the date and time of your visit.</li>
            <li><strong>Cookies and similar technologies</strong>, as described in Section 6 below.</li>
          </ul>

          <h3>Sensitive personal data</h3>
          <p>
            Health information, financial information and passwords are treated as sensitive personal data or information under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. We collect such information only where it is necessary for a lawful purpose connected with our services, and only with your consent.
          </p>

          <h2 id="how-we-use-your-information">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>respond to your enquiries and schedule, confirm, reschedule or cancel consultations and procedures;</li>
            <li>register and service your patient portal account and make your reports and records available to you;</li>
            <li>process payments, issue receipts and invoices, and handle refunds and insurance or TPA coordination;</li>
            <li>provide continuity of care, including diagnostic follow-up, post-operative review and Tele-ICU or teleconsultation support where applicable;</li>
            <li>send you appointment reminders, service messages and transactional communications by SMS, email or WhatsApp;</li>
            <li>send you health updates, newsletters and promotional communications, where you have opted in;</li>
            <li>improve the performance, security and usability of our website and our patient experience;</li>
            <li>carry out internal administration, quality assurance, audit and accreditation activities; and</li>
            <li>comply with applicable legal, regulatory, statutory and accreditation requirements, and to establish, exercise or defend legal claims.</li>
          </ul>
          <p>
            We do not use your information for any purpose that is incompatible with the purpose for which it was collected, without obtaining your consent.
          </p>

          <h2 id="consent">3. Consent</h2>
          <p>
            We collect and process your personal information on the basis of your consent, which you provide by submitting information to us through our website. Where we rely on your consent, you may withdraw it at any time by writing to our Grievance Officer at the address in Section 13.
          </p>
          <p>
            Withdrawing your consent will not affect the lawfulness of processing carried out before the withdrawal. Please note that if you withdraw consent for information that is necessary for us to provide a service, we may not be able to continue providing that service to you. We may also continue to retain and process information where we are required or permitted to do so by law.
          </p>

          <h2 id="how-we-share-your-information">4. How We Share Your Information</h2>
          <h3>We do not sell your personal information.</h3>
          <p>We share your information only as described below:</p>
          <ul>
            <li><strong>With our clinical and administrative teams</strong>, including the doctors, nurses, technicians and staff involved in your care or in responding to your enquiry, on a need-to-know basis.</li>
            <li><strong>With service providers</strong> who support our operations under contract and are bound by confidentiality and data protection obligations, including our website host, email and messaging providers, analytics providers, payment gateway, laboratory and diagnostic partners, and IT support vendors.</li>
            <li><strong>With referral and network partners</strong>, including partner hospitals, clinics and Tele-ICU facilities within our network, where this is necessary for your care.</li>
            <li><strong>With insurers, third-party administrators and government health schemes</strong>, where you have requested cashless treatment or reimbursement, or where a claim is being processed on your behalf.</li>
            <li><strong>With government authorities, courts, regulators and law enforcement agencies</strong>, where disclosure is required by law, by court order, or in connection with a statutory notification such as a notifiable disease report or a medico-legal case.</li>
            <li><strong>In connection with a business transfer</strong>, such as a merger, acquisition or reorganisation, in which case the recipient will be bound by this policy or an equivalent one.</li>
          </ul>

          <h2 id="payments">5. Payments</h2>
          <p>
            Online payments made through our website are processed by a third-party payment aggregator authorised by the Reserve Bank of India. Your card, UPI and banking details are entered on the payment aggregator&#x27;s secure interface and are processed by them in accordance with their own privacy policy and applicable RBI directions. Details of our current payment aggregator are available on request from our Grievance Officer. Futureace does not collect or store your full card number, CVV or banking passwords.
          </p>

          <h2 id="cookies-and-tracking-technologies">6. Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar technologies to keep the site functioning correctly, remember your preferences, and understand how visitors use the site. We use:
          </p>
          <ul>
            <li><strong>Essential cookies</strong>, which are necessary for the website and patient portal to operate;</li>
            <li><strong>Analytics cookies</strong>, which help us measure traffic and improve the site; and</li>
            <li><strong>Advertising and remarketing cookies</strong>, where applicable, which may be set by third-party platforms.</li>
          </ul>
          <p>
            Where we use third-party analytics or advertising services, those providers may process technical data about your visit as independent controllers under their own privacy policies. A current list of the analytics and advertising tools in use on this website is available on request from our Grievance Officer.
          </p>
          <p>
            You can control or disable cookies through your browser settings. Disabling essential cookies may prevent parts of the website, including the patient portal, from working.
          </p>

          <h2 id="data-security">7. Data Security</h2>
          <p>
            We follow reasonable security practices and procedures designed to protect your information against unauthorised access, disclosure, alteration or loss. These include access controls and role-based permissions, encryption of data in transit, secure hosting, firewalls, staff confidentiality undertakings, and periodic review of our security measures.
          </p>
          <p>
            No method of transmission over the internet or method of electronic storage is completely secure. While we work to protect your information, we cannot guarantee absolute security.
          </p>

          <h2 id="data-retention">8. Data Retention</h2>
          <p>
            We retain your information only for as long as it is required for the purpose for which it was collected, or for as long as we are required to retain it under applicable law.
          </p>
          <ul>
            <li>Enquiry and appointment information is retained for the period necessary to respond to you and to coordinate your care.</li>
            <li>Medical records are retained in accordance with applicable medical records retention requirements.</li>
            <li>Financial and tax records are retained for the periods prescribed under applicable law.</li>
            <li>Marketing subscription records are retained until you unsubscribe, and for a short period thereafter to give effect to your opt-out.</li>
          </ul>
          <p>When information is no longer required, we delete it or anonymise it securely.</p>

          <h2 id="your-rights">9. Your Rights</h2>
          <p>Subject to applicable law, you may:</p>
          <ul>
            <li><strong>access</strong> the personal information we hold about you and obtain a summary of how it is processed;</li>
            <li><strong>correct or update</strong> information that is inaccurate, incomplete or out of date;</li>
            <li><strong>request erasure</strong> of information that is no longer required for the purpose for which it was collected, subject to our legal retention obligations;</li>
            <li><strong>withdraw consent</strong> to our processing of your information;</li>
            <li><strong>opt out of marketing communications</strong> at any time; and</li>
            <li><strong>nominate</strong> another individual to exercise these rights on your behalf in the event of your death or incapacity.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact our Grievance Officer using the details in Section 13. We may ask you to verify your identity before acting on your request. We will respond to your request within the timelines prescribed under applicable law.
          </p>

          <h2 id="marketing-communications">10. Marketing Communications</h2>
          <p>
            If you have opted in to receive health updates, newsletters or promotional messages from us by email, SMS or WhatsApp, you can opt out at any time by using the unsubscribe link in the email, replying STOP to the message, or writing to us at the address in Section 13.
          </p>
          <p>
            Opting out of marketing communications will not stop transactional and service messages such as appointment confirmations, reminders, reports and billing notices.
          </p>

          <h2 id="children-s-information">11. Children&#x27;s Information</h2>
          <p>
            Our website is not directed at children. Where we collect information relating to a child in connection with the child&#x27;s treatment or an appointment request, we do so from a parent or legal guardian. We do not knowingly undertake tracking, behavioural monitoring or targeted advertising directed at children.
          </p>
          <p>
            If you believe a child has provided us information without parental consent, please contact our Grievance Officer and we will take appropriate steps to delete it.
          </p>

          <h2 id="third-party-links">12. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites, including insurers, diagnostic partners, health platforms and social media pages. We are not responsible for the privacy practices or content of those websites. We encourage you to read their privacy policies before providing them with your information.
          </p>

          <h2 id="grievance-officer-and-contact-details">13. Grievance Officer and Contact Details</h2>
          <p>If you have a question, request or complaint regarding this Privacy Policy or the handling of your personal information, please contact:</p>
          <h3>Grievance Officer</h3>
          <p>Adithyan N S, IT Executive</p>
          <p>Futureace Healthcare Private Limited</p>
          <p>Registered office: Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India</p>
          <p>Email: <a href="mailto:info@futureacehospital.com">info@futureacehospital.com</a></p>
          <p>We will acknowledge your communication promptly and endeavour to resolve your grievance within the timelines prescribed under applicable law.</p>

          <h3>General enquiries</h3>
          <p>Futureace Hospital</p>
          <p>Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India</p>
          <p>Phone: <a href="tel:+918589003330">+91 85890 03330</a></p>
          <p>Email: <a href="mailto:hello@futureacehospital.com">hello@futureacehospital.com</a></p>

          <h2 id="changes-to-this-policy">14. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or in applicable law. The revised policy will be posted on this page with a new &quot;Last updated&quot; date. We encourage you to review this page periodically. Where a change is material, we will take reasonable steps to notify you.
          </p>

          <h2 id="governing-law">15. Governing Law</h2>
          <p>
            This Privacy Policy is governed by the laws of India. Any dispute arising out of or in connection with this policy shall be subject to the exclusive jurisdiction of the courts at Ernakulam, Kerala.
          </p>
        </div>
      </main>
    </div>
  );
}
