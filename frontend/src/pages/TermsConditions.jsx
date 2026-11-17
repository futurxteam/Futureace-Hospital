import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/legal.css';

export default function TermsConditions() {
  useEffect(() => {
    // ── SEO Metadata ──
    document.title = 'Terms & Conditions | Futureace Hospital';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Terms and Conditions for use of the Futureace Hospital website, including appointments, teleconsultation, online payments, refunds and acceptable use.'
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://www.futureacehospital.com/terms-conditions');

    return () => {
      document.title = 'Futureace Hospital';
    };
  }, []);

  return (
    <div className="legal-page-wrapper">
      {/* ── Page Hero ── */}
      <section className="legal-hero" aria-label="Terms and Conditions Header">
        <div className="legal-hero-badge">Legal &amp; Compliance</div>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: 28 August 2026</p>
      </section>

      {/* ── Main Legal Content ── */}
      <main className="legal-page-container">
        <div className="legal-nav-pill">
          <span>Looking for our data privacy details?</span>
          <Link to="/privacy-policy">View Privacy Policy &rarr;</Link>
        </div>

        <div className="legal-content">
          <p>
            These Terms and Conditions govern your use of www.futureacehospital.com (the &quot;website&quot;), which is owned and operated by Futureace Healthcare Private Limited, a company incorporated under the Companies Act, 2013, having its registered office and hospital premises at Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India (&quot;Futureace&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;).
          </p>
          <p>
            By accessing or using this website, requesting an appointment, booking a teleconsultation or making a payment through it, you confirm that you have read, understood and agree to be bound by these Terms. If you do not agree, please discontinue use of the website.
          </p>
          <p>
            These Terms should be read together with our <Link to="/privacy-policy">Privacy Policy</Link>, which explains how we handle your personal information.
          </p>

          <h2 id="emergency-notice">1. Emergency Notice</h2>
          <p>
            <strong>This website is not a medical emergency service.</strong> Do not use the website, its forms or its teleconsultation facility to seek help in an emergency. If you or another person is experiencing a medical emergency, call 108 for emergency ambulance services, proceed immediately to the nearest emergency department, or come directly to Futureace Hospital.
          </p>

          <h2 id="purpose-of-this-website">2. Purpose of This Website</h2>
          <p>
            This website provides general information about Futureace Hospital, our doctors, departments, treatments, facilities and locations, and allows you to submit enquiries, request appointments and, where offered, book and pay for a teleconsultation.
          </p>
          <p>
            Information published on this website, including articles, health guides and department pages, is general in nature and is provided for educational purposes only.
          </p>

          <h2 id="medical-disclaimer-and-no-doctor-patient-relationship">3. Medical Disclaimer and No Doctor–Patient Relationship</h2>
          <p>
            Content on this website is not medical advice, diagnosis or treatment, and must not be relied upon as a substitute for consultation with a qualified medical practitioner. Always seek the advice of your physician or another qualified health provider regarding any medical condition, and never disregard or delay seeking professional medical advice because of something you have read on this website.
          </p>
          <p>
            Browsing this website, submitting an enquiry or requesting an appointment does not create a doctor–patient relationship between you and Futureace or any of our doctors. A doctor–patient relationship is established only when a consultation actually takes place, whether in person at our hospital or through a confirmed teleconsultation.
          </p>
          <p>
            Treatment outcomes vary from patient to patient. Any information on this website relating to procedures, recovery, success rates or timelines is indicative only and does not constitute a promise, warranty or guarantee of any particular clinical outcome.
          </p>
          <p>
            Doctor profiles, department listings, availability, timings, facilities and empanelment details are subject to change without notice. While we make reasonable efforts to keep the website accurate and current, we do not warrant that all content is complete, error-free or up to date.
          </p>

          <h2 id="appointments-and-enquiries">4. Appointments and Enquiries</h2>
          <p>
            Submitting an appointment or enquiry form on this website is a <strong>request</strong>, not a confirmed booking. It does not guarantee a particular doctor, department, date, time slot or fee.
          </p>
          <p>
            Your appointment is confirmed only when our team contacts you and confirms it. We may contact you by phone, SMS, email or WhatsApp using the details you provide, for this purpose.
          </p>
          <p>
            We may decline, reschedule or reallocate an appointment request where the requested doctor is unavailable, where the clinical need is better met by another department, or for operational reasons. Where a doctor is unavailable at short notice, we will make reasonable efforts to inform you and offer an alternative.
          </p>
          <p>
            Please arrive with any relevant prior records, prescriptions and reports, and inform us in advance if you need to cancel or reschedule.
          </p>

          <h2 id="teleconsultation-services">5. Teleconsultation Services</h2>
          <p>Where we offer teleconsultations through this website, the following additional terms apply.</p>
          <p>
            <strong>Regulatory framework.</strong> Teleconsultations at Futureace are provided in accordance with the Telemedicine Practice Guidelines, 2020 issued under the Indian Medical Council Act and administered by the National Medical Commission, as amended from time to time. Consultations are conducted only by medical practitioners registered with the National Medical Commission or a State Medical Council.
          </p>
          <p>
            <strong>Consent.</strong> By initiating or joining a teleconsultation, you give your explicit consent to the consultation being conducted remotely. Your consent will be recorded. You may withdraw consent and end the consultation at any time.
          </p>
          <p>
            <strong>Identity and eligibility.</strong> You must provide accurate identity, age and contact details, and accurate information about your symptoms, medical history, current medication and allergies. Teleconsultation for a minor or for a person unable to consent must be requested by a parent, legal guardian or authorised caregiver, who must be present during the consultation.
          </p>
          <p>
            <strong>Limitations.</strong> Teleconsultation cannot include a physical examination and is therefore not suitable for every condition. The consulting doctor may, at their sole professional discretion, decline to advise remotely, limit the advice given, or require an in-person visit or investigations before proceeding. This is a clinical judgement made in your interest and does not entitle you to a refund of the consultation fee where the consultation has taken place.
          </p>
          <p>
            <strong>Prescriptions.</strong> Any prescription issued following a teleconsultation will be limited to the categories of medicine permitted under the Telemedicine Practice Guidelines. Drugs listed in Schedule X and other restricted or prohibited categories will not be prescribed through a teleconsultation.
          </p>
          <p>
            <strong>Technology.</strong> Teleconsultation depends on your internet connection, device and the third-party platform used to host the consultation. We are not responsible for interruption, poor audio or video quality, or failure of the consultation caused by factors outside our reasonable control. Where a consultation fails for technical reasons attributable to us, we will reschedule it at no additional charge.
          </p>
          <p>
            <strong>Records.</strong> Records of the teleconsultation, including consent, advice given and any prescription issued, will be maintained by us in accordance with applicable law and our <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2 id="fees-and-online-payments">6. Fees and Online Payments</h2>
          <p>
            Fees for teleconsultation and other services offered through the website are displayed before you confirm payment and are in Indian Rupees, inclusive of applicable taxes unless stated otherwise. Fees are subject to change without prior notice, but a change will not affect a booking already confirmed and paid for.
          </p>
          <p>
            Online payments are processed by our third-party payment gateway partner. Futureace does not collect or store your card number, CVV, UPI PIN or banking passwords. Your use of the payment facility is additionally subject to the terms and privacy policy of the payment gateway and your bank or card issuer.
          </p>
          <p>
            You are responsible for ensuring that the payment details you use are your own or are used with the authorisation of the account holder. A booking is confirmed only when payment has been successfully received and confirmed by us.
          </p>
          <p>
            Where a payment is deducted from your account but not received or confirmed by us, please contact us with the transaction reference so that we can verify the position with the gateway and, if appropriate, process a refund under Section 7.
          </p>

          <h2 id="cancellation-and-refund-policy">7. Cancellation and Refund Policy</h2>
          <p>
            <strong>Cancellation by you.</strong> You may cancel a booked teleconsultation by contacting us before the scheduled time. Where you cancel in advance, or where you do not attend and inform us within a reasonable period, we will refund the fee paid or, at your option, reschedule the consultation.
          </p>
          <p>
            <strong>Cancellation by us.</strong> If we cancel or are unable to provide a booked teleconsultation, or if the consultation fails for technical reasons attributable to us and cannot be rescheduled, we will refund the fee in full.
          </p>
          <p>
            <strong>Failed and duplicate transactions.</strong> Where an amount is debited but the booking is not confirmed, or where a duplicate payment has been made, the amount will be refunded in full.
          </p>
          <p>
            <strong>Consultations that have taken place.</strong> Fees are not refundable once the consultation has taken place, including where the doctor advises an in-person visit or further investigation, since the consultation and clinical opinion have been provided.
          </p>
          <p>
            <strong>How refunds are made.</strong> Approved refunds are made to the original payment method used for the transaction and are ordinarily credited within <strong>7 to 10 working days</strong> of approval. The time taken for the credit to appear in your account depends on your bank or card issuer. Refunds are not made in cash or to a different account.
          </p>
          <p>
            To request a refund, contact us using the details in Section 16, quoting your booking reference and transaction details.
          </p>

          <h2 id="user-accounts-and-the-patient-portal">8. User Accounts and the Patient Portal</h2>
          <p>
            Where the website offers a registered account or patient portal, you are responsible for providing accurate registration details, for keeping your login credentials confidential, and for all activity that takes place under your account.</p>
          <p>
            You must not share your credentials, allow another person to use your account, or attempt to access an account or health record that is not your own or that of a person you are lawfully authorised to represent.
          </p>
          <p>
            Notify us immediately if you become aware of any unauthorised use of your account. We may suspend or terminate an account where we reasonably believe it has been compromised or is being misused.
          </p>

          <h2 id="acceptable-use">9. Acceptable Use</h2>
          <p>You agree to use this website lawfully and not to:</p>
          <ul>
            <li>misuse the website or interfere with its normal operation, security or availability;</li>
            <li>attempt to gain unauthorised access to any part of the website, its servers, databases or any account or health record;</li>
            <li>introduce viruses, malware or any other harmful code;</li>
            <li>use automated systems, scrapers, bots or harvesting tools in a manner that degrades service or extracts data in bulk;</li>
            <li>submit false, misleading, defamatory, obscene, abusive or unlawful content, or impersonate any person;</li>
            <li>submit another person&#x27;s personal or health information without their authority;</li>
            <li>use the website or its content for any commercial purpose, including advertising, solicitation or competitive benchmarking, without our written permission; or</li>
            <li>use the website in any way that violates applicable Indian law, including laws relating to medical practice, advertising of medical services, drugs and cosmetics, and information technology.</li>
          </ul>
          <p>
            We may remove content, restrict access, or suspend or terminate your use of the website where we reasonably believe these Terms have been breached.
          </p>

          <h2 id="intellectual-property">10. Intellectual Property</h2>
          <p>
            All content on this website, including the Futureace name, logo, text, images, photographs, videos, graphics, layout, design and software, is owned by or licensed to Futureace Healthcare Private Limited and is protected by applicable intellectual property laws.
          </p>
          <p>
            You may view, download and print content from this website for your own personal, non-commercial use. You may not otherwise copy, reproduce, republish, distribute, modify, adapt or create derivative works from any part of the website, or use our name, logo or marks, without our prior written permission.
          </p>
          <p>Photographs of doctors, staff, patients and facilities must not be reproduced in any form.</p>

          <h2 id="third-party-links-and-services">11. Third-Party Links and Services</h2>
          <p>
            The website may contain links to, or integrations with, third-party websites and services, including our payment gateway, teleconsultation platform, diagnostic partners, insurers, third-party administrators and social media platforms.
          </p>
          <p>
            These are provided for your convenience. We do not control and are not responsible for the content, availability, security or practices of third-party websites and services, and a link does not imply endorsement. Your use of them is at your own risk and subject to their own terms and policies.
          </p>

          <h2 id="privacy">12. Privacy</h2>
          <p>
            Your use of this website is also governed by our <Link to="/privacy-policy">Privacy Policy</Link>, which forms part of these Terms and explains what personal information we collect, how we use and share it, how long we keep it, and how you may exercise your rights.
          </p>

          <h2 id="limitation-of-liability">13. Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law:</p>
          <ul>
            <li>the website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, whether express or implied;</li>
            <li>we do not warrant that the website will be uninterrupted, timely, secure or free from errors or viruses;</li>
            <li>we are not liable for any indirect, incidental, special, consequential or punitive loss, or for any loss of profits, revenue, data, goodwill or opportunity, arising from your use of, or inability to use, this website or from reliance on its general educational content; and</li>
            <li>our total aggregate liability arising out of or in connection with your use of this website, or any transaction concluded through it, shall not exceed the amount actually paid by you to us through the website in respect of that transaction.</li>
          </ul>
          <p>
            Nothing in these Terms limits or excludes any liability that cannot lawfully be limited or excluded, including liability for death or personal injury caused by negligence, or for fraud.
          </p>
          <p>
            <strong>Clinical care.</strong> These limitations apply to your use of the website. Clinical care provided at Futureace Hospital, and the professional obligations of our doctors, are governed by the doctor–patient relationship, the applicable standard of medical care, and applicable Indian law, and are not limited by this Section.
          </p>

          <h2 id="indemnity">14. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless Futureace Healthcare Private Limited, its directors, officers, employees and agents against any claim, loss, liability, cost or expense arising from your breach of these Terms, your misuse of the website, or your submission of false, unlawful or unauthorised information through it.
          </p>

          <h2 id="changes-suspension-and-termination">15. Changes, Suspension and Termination</h2>
          <p>
            We may amend these Terms at any time. The revised version will be posted on this page with a new &quot;Last updated&quot; date and takes effect from the date of posting. Your continued use of the website after that date constitutes acceptance of the revised Terms. Please review this page periodically.
          </p>
          <p>
            We may also modify, suspend or discontinue any part of the website, including any online service or facility, at any time and without notice, subject to honouring bookings already confirmed and paid for.
          </p>

          <h2 id="governing-law-jurisdiction-and-grievances">16. Governing Law, Jurisdiction and Grievances</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Subject to the grievance process below, the courts at Ernakulam, Kerala shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or your use of this website.
          </p>

          <h3>Grievance Officer</h3>
          <p>In accordance with the Information Technology Act, 2000 and the rules made thereunder, the details of our Grievance Officer are:</p>
          <p>Adithyan N S, IT Executive</p>
          <p>Futureace Healthcare Private Limited</p>
          <p>Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India</p>
          <p>Email: <a href="mailto:info@futureacehospital.com">info@futureacehospital.com</a></p>
          <p>We will acknowledge your complaint promptly and endeavour to resolve it within the timelines prescribed under applicable law.</p>

          <h3>General enquiries</h3>
          <p>Futureace Hospital, Building No. 37/3712, B, C, D &amp; F, Ground and First Floor, Mamson Royale, Chakkaraparambu Junction, Edappally, Ernakulam, Kerala 682024, India</p>
          <p>Phone: <a href="tel:+918589003330">+91 85890 03330</a></p>
          <p>Email: <a href="mailto:hello@futureacehospital.com">hello@futureacehospital.com</a></p>

          <h2 id="severability-and-entire-agreement">17. Severability and Entire Agreement</h2>
          <p>
            If any provision of these Terms is held to be invalid or unenforceable, that provision will be severed and the remaining provisions will continue in full force and effect. Our failure to enforce any provision does not amount to a waiver of it.
          </p>
          <p>
            These Terms, together with our <Link to="/privacy-policy">Privacy Policy</Link>, constitute the entire agreement between you and Futureace in relation to your use of this website.
          </p>
        </div>
      </main>
    </div>
  );
}
