
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
        <title>Sudevi Agro Foods - Premium Indian Pickles, Spices & Food Products</title>
        <meta name="description" content="Sudevi Agro Foods manufactures authentic Indian pickles, spices, soya chunks and vermicelli in Balasore, Odisha. Taste the tradition with our premium quality food products made from natural ingredients." />
        <meta name="keywords" content="Indian pickles, organic spices, soya chunks, vermicelli, food manufacturing, Balasore, Odisha, authentic Indian food, traditional recipes, natural ingredients, premium quality" />
        <meta name="author" content="Sudevi Agro Foods Private Limited" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://sudevi-agro-foods.lovable.app/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sudevi-agro-foods.lovable.app/" />
        <meta property="og:title" content="Sudevi Agro Foods - Premium Indian Pickles, Spices & Food Products" />
        <meta property="og:description" content="Sudevi Agro Foods manufactures authentic Indian pickles, spices, soya chunks and vermicelli in Balasore, Odisha. Taste the tradition with our premium quality food products." />
        <meta property="og:image" content="https://sudevi-agro-foods.lovable.app/lovable-uploads/35d4be78-f0f1-4c6a-8bf7-40a140323a71.png" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Sudevi Agro Foods" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://sudevi-agro-foods.lovable.app/" />
        <meta name="twitter:title" content="Sudevi Agro Foods - Premium Indian Pickles, Spices & Food Products" />
        <meta name="twitter:description" content="Sudevi Agro Foods manufactures authentic Indian pickles, spices, soya chunks and vermicelli in Balasore, Odisha. Taste the tradition with our premium quality food products." />
        <meta name="twitter:image" content="https://sudevi-agro-foods.lovable.app/lovable-uploads/35d4be78-f0f1-4c6a-8bf7-40a140323a71.png" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="IN-OR" />
        <meta name="geo.placename" content="Balasore" />
        <meta name="geo.position" content="21.482787;86.934046" />
        <meta name="ICBM" content="21.482787, 86.934046" />
        
        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sudevi Agro Foods Private Limited",
            "url": "https://sudevi-agro-foods.lovable.app/",
            "logo": "https://sudevi-agro-foods.lovable.app/lovable-uploads/35d4be78-f0f1-4c6a-8bf7-40a140323a71.png",
            "description": "Sudevi Agro Foods manufactures authentic Indian pickles, spices, soya chunks and vermicelli in Balasore, Odisha.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Plot No:- 1730/2463/9212, AT- Mohammadpur, Badakhua Lane, Sunhat",
              "addressLocality": "Balasore",
              "addressRegion": "Odisha",
              "postalCode": "756002",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-8260990093",
              "contactType": "customer service",
              "email": "sudevifoods@gmail.com"
            },
            "sameAs": []
          })}
        </script>
      </Helmet>
      
      <Hero />
      <Products />
      <About />
      <Contact />
    </>
  );
};

export default Index;
