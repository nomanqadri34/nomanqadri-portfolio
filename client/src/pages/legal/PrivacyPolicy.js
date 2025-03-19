import React from 'react';
import './Legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Messages you send through our contact form</li>
            <li>Information about your device and internet connection</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you updates and marketing communications</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Professional advisors and consultants</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage practices</li>
          </ul>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2>6. Cookies and Tracking</h2>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze website traffic</li>
            <li>Improve user experience</li>
            <li>Provide personalized content</li>
          </ul>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>
          <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.</p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at:</p>
          <div className="contact-info">
          <p>Email: al.qadri.web.dev@gmail.com</p>
            
            <p>Phone: +918957582590</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 