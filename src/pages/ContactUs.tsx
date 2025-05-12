
import { Helmet } from "react-helmet";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/Forms/ContactForm";

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Sudevi Agro Foods</title>
        <meta name="description" content="Get in touch with Sudevi Agro Foods. Contact us for inquiries about our products, partnerships, or any other information." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 animate-fade-in">Contact Us</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto animate-fade-in delay-200">
            We'd love to hear from you. Get in touch with our team for any inquiries or information.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="reveal-left">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            <div className="reveal-right">
              <h2 className="text-2xl font-bold mb-6">Our Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start hover-shadow p-4 rounded-lg transition-medium">
                  <MapPin className="h-6 w-6 text-sudevi-red mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <address className="not-italic text-gray-600">
                      Plot No:- 1730/2463/9212, <br />
                      AT- Mohammadpur, Badakhua Lane, <br />
                      Sunhat, Balasore, <br />
                      Odisha - 756002
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start hover-shadow p-4 rounded-lg transition-medium">
                  <Phone className="h-6 w-6 text-sudevi-red mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+918260990093" className="hover:text-sudevi-red hover-underline">
                        +91 8260990093
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start hover-shadow p-4 rounded-lg transition-medium">
                  <Mail className="h-6 w-6 text-sudevi-red mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:sudevifoods@gmail.com" className="hover:text-sudevi-red hover-underline">
                        sudevifoods@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 reveal">
                <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 reveal">Find Us</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96 w-full reveal hover-shadow">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.0716833772265!2d86.93404579999999!3d21.482786699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c5ed70f4ccb0d%3A0x54d4ca9456691d95!2sSudevi%20Agro%20Foods%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1716414302279!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sudevi Agro Foods Location"
              aria-label="Google Maps showing the location of Sudevi Agro Foods Pvt. Ltd."
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
