
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Index = () => {
  // Add smooth scrolling behavior on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Sudevi Agro Foods - Taste The Tradition</title>
        <meta name="description" content="Sudevi Agro Foods manufactures authentic Indian pickles, spices, soya chunks and vermicelli. Taste the tradition with our range of quality food products." />
      </Helmet>
      
      <Hero />
      <Products />
      <About />
      <Contact />
    </>
  );
};

export default Index;
