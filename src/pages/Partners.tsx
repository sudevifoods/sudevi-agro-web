
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Partners = () => {
  return (
    <>
      <Helmet>
        <title>Partner With Us - Sudevi Agro Foods</title>
        <meta name="description" content="Explore partnership opportunities with Sudevi Agro Foods. Become a distributor, retailer, or supplier and grow with us." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Partner With Us</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Join hands with Sudevi Agro Foods and be part of our growth journey.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Partner With Us</h2>
              <p className="text-gray-700 mb-6">
                At Sudevi Agro Foods, we believe in building strong, mutually beneficial partnerships. Whether you're a distributor, retailer, or supplier, we offer competitive terms and support to help your business grow alongside ours.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sudevi-red mr-2 shrink-0" />
                  <span className="text-gray-700">Access to premium quality food products</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sudevi-red mr-2 shrink-0" />
                  <span className="text-gray-700">Competitive pricing and attractive margins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sudevi-red mr-2 shrink-0" />
                  <span className="text-gray-700">Marketing and promotional support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sudevi-red mr-2 shrink-0" />
                  <span className="text-gray-700">Reliable and timely delivery</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-sudevi-red mr-2 shrink-0" />
                  <span className="text-gray-700">Dedicated relationship manager</span>
                </li>
              </ul>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Business Partnership" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Partnership Opportunities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-sudevi-red/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sudevi-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Distributors</h3>
                <p className="text-gray-600 mb-6">
                  Join our distribution network and help us reach more customers across different regions.
                </p>
                <Button asChild className="bg-sudevi-red hover:bg-sudevi-darkRed w-full">
                  <a href="#distributor-form">Become a Distributor</a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-sudevi-red/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sudevi-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Retailers</h3>
                <p className="text-gray-600 mb-6">
                  Stock our products in your store and offer your customers authentic Indian flavors.
                </p>
                <Button asChild className="bg-sudevi-red hover:bg-sudevi-darkRed w-full">
                  <a href="#retailer-form">Become a Retailer</a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-sudevi-red/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sudevi-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Suppliers</h3>
                <p className="text-gray-600 mb-6">
                  Supply us with raw materials and ingredients to support our production.
                </p>
                <Button asChild className="bg-sudevi-red hover:bg-sudevi-darkRed w-full">
                  <a href="#supplier-form">Become a Supplier</a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg" id="distributor-form">
            <h2 className="text-2xl font-bold mb-6">Partner Application Form</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700 mb-1">
                    Partnership Type
                  </label>
                  <select
                    id="partnerType"
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location/Region
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-sudevi-red focus:border-sudevi-red"
                ></textarea>
              </div>
              
              <Button type="submit" className="bg-sudevi-red hover:bg-sudevi-darkRed">
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
