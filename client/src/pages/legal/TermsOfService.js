import React from 'react';
import './Legal.css';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-header">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily access the materials on our website for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
            <li>Transfer the materials to another person</li>
          </ul>
        </section>

        <section>
          <h2>3. Disclaimer</h2>
          <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:</p>
          <ul>
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of intellectual property</li>
            <li>Accuracy, reliability, and availability of the website</li>
          </ul>
        </section>

        <section>
          <h2>4. Limitations</h2>
          <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our website.</p>
        </section>

        <section>
          <h2>5. User Content</h2>
          <p>Users may post content as long as it isn't illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to third parties.</p>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>The content on this website, including without limitation:</p>
          <ul>
            <li>Text, graphics, logos, and images</li>
            <li>Software and functionality</li>
            <li>Website design and organization</li>
            <li>Data and databases</li>
          </ul>
          <p>are owned by us or our licensors and are protected by copyright and other intellectual property laws.</p>
        </section>

        <section>
          <h2>7. Termination</h2>
          <p>We may terminate or suspend access to our website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date of these terms.</p>
        </section>

        <section>
          <h2>10. Contact Information</h2>
          <p>For any questions regarding these Terms of Service, please contact us at:</p>
          <div className="contact-info">
            <p>Email: al.qadri.web.dev@gmail.com</p>
            
            <p>Phone: +918957582590</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 