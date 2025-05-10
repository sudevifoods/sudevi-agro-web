
import Hero from "@/components/Home/Hero";
import Products from "@/components/Home/Products";
import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import { Helmet } from "react-helmet";

const Index = () => {
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
