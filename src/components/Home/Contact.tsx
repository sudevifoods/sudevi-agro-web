
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

const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or interested in partnering with us? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0 flex items-center justify-center">
              <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <Phone className="h-8 w-8 text-sudevi-red" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Our customer support team is ready to help you</p>
              <a 
                href="tel:+918260990093" 
                className="text-sudevi-red font-medium hover:underline"
              >
                +91 8260990093
              </a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0 flex items-center justify-center">
              <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <Mail className="h-8 w-8 text-sudevi-red" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll get back to you</p>
              <a 
                href="mailto:sudevifoods@gmail.com" 
                className="text-sudevi-red font-medium hover:underline"
              >
                sudevifoods@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-0 flex items-center justify-center">
              <div className="bg-sudevi-red/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-sudevi-red" />
              </div>
            </CardHeader>
            <CardContent className="text-center pt-4">
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Come visit our manufacturing facility</p>
              <address className="not-italic text-sudevi-red font-medium">
                Mohammadpur, Balasore, 756002
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-8">
          <div className="rounded-lg overflow-hidden shadow-lg h-64 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14772.287033308506!2d86.9340458!3d21.4827867!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c5ed70f4ccb0d%3A0x54d4ca9456691d95!2sSudevi%20Agro%20Foods%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1716414302279!5m2!1sen!2sin" 
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
          
          <div className="text-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-sudevi-red hover:bg-sudevi-darkRed mr-4">
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
            
            <Button asChild size="lg" variant="outline" className="border-sudevi-red text-sudevi-red hover:bg-sudevi-red/10">
              <Link to="/contact">View More Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
