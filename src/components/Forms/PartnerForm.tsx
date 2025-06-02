import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { sendPartnerApplicationEmail } from "@/services/emailService";

interface PartnerFormProps {
  onSuccess?: () => void;
}

const PartnerForm = ({ onSuccess }: PartnerFormProps) => {
  const [formData, setFormData] = useState({
    company: "",
    partnerType: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email notification
      const emailResult = await sendPartnerApplicationEmail(formData);

      if (emailResult.success) {
        toast({
          title: "Partnership application submitted",
          description: "Thank you for your interest! We will review your application and get back to you soon."
        });
      } else {
        toast({
          title: "Application submitted",
          description: "Your application has been submitted, but we couldn't send a notification email."
        });
      }
      
      setFormData({
        company: "",
        partnerType: "",
        contactPerson: "",
        email: "",
        phone: "",
        location: "",
        message: ""
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting partnership application:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <Input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700 mb-1">
            Partnership Type
          </label>
          <select
            id="partnerType"
            name="partnerType"
            value={formData.partnerType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
            required
          >
            <option value="">Select a partnership type</option>
            <option value="distributor">Distributor</option>
            <option value="retailer">Retailer</option>
            <option value="supplier">Supplier</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <Input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location/Region
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Information
        </label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full"
        ></Textarea>
      </div>
      
      <Button 
        type="submit" 
        className="bg-sudevi-red hover:bg-sudevi-darkRed"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default PartnerForm;
