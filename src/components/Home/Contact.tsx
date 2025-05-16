
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from '@/components/Forms/ContactForm';
import { Reveal } from '@/hooks/useScrollAnimation';

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Reveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our products or interested in partnering with us? Reach out to our team.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Phone className="h-8 w-8 text-sudevi-red" />,
              title: "Call Us",
              description: "Our customer support team is ready to help you",
              contact: <a href="tel:+918260990093" className="text-sudevi-red font-medium hover:underline">+91 8260990093</a>
            },
            {
              icon: <Mail className="h-8 w-8 text-sudevi-red" />,
              title: "Email Us",
              description: "Send us an email and we'll get back to you",
              contact: <a href="mailto:sudevifoods@gmail.com" className="text-sudevi-red font-medium hover:underline">sudevifoods@gmail.com</a>
            },
            {
              icon: <MapPin className="h-8 w-8 text-sudevi-red" />,
              title: "Visit Us",
              description: "Come visit our manufacturing facility",
              contact: <address className="not-italic text-sudevi-red font-medium">Mohammadpur, Balasore, 756002</address>
            }
          ].map((item, index) => (
            <Reveal key={item.title} direction="up" delay={index * 150}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-0 flex items-center justify-center">
                  <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-center pt-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.contact}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <Reveal direction="up" delay={450}>
            <div className="rounded-lg overflow-hidden shadow-lg h-64 w-full">
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
          </Reveal>
          
          <Reveal direction="up" delay={600}>
            <div className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-sudevi-red hover:bg-sudevi-darkRed mr-4 hover:scale-105 transition-transform">
                    Contact Us Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Contact Us</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <ContactForm />
                </DialogContent>
              </Dialog>
              
              <Button asChild size="lg" variant="outline" className="border-sudevi-red text-sudevi-red hover:bg-sudevi-red/10 hover:scale-105 transition-transform">
                <Link to="/contact">View More Details</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
