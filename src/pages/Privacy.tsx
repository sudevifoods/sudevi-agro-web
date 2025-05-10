
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Sudevi Agro Foods</title>
        <meta name="description" content="Sudevi Agro Foods Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Privacy Policy</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Last updated: May 10, 2025
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="prose prose-lg max-w-none">
              <p>
                At Sudevi Agro Foods Private Limited, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Important Information and Who We Are</h2>
              <p>
                <strong>Purpose of this Privacy Policy</strong>
              </p>
              <p>
                This privacy policy aims to give you information on how Sudevi Agro Foods collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up for our newsletter, purchase a product, or take part in a promotion.
              </p>
              <p>
                It is important that you read this privacy policy together with any other privacy notice or fair processing notice we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
              </p>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul>
                <li>Identity Data includes first name, last name, username or similar identifier, title.</li>
                <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                <li>Financial Data includes payment card details.</li>
                <li>Transaction Data includes details about payments to and from you and other details of products you have purchased from us.</li>
                <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul>
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p>
                <strong>Sudevi Agro Foods Private Limited</strong><br />
                Plot No:- 1730/2463/9212, <br />
                AT- Mohammadpur, Badakhua Lane, <br />
                Sunhat, Balasore, <br />
                Odisha - 756002 <br />
                Email: sudevifoods@gmail.com <br />
                Phone: +91 8260990093
              </p>
              
              <p className="mt-8 text-gray-600">
                This Privacy Policy was last updated on May 10, 2025.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
