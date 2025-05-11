
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

function Box() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/lovable-uploads/52338f59-44c9-401f-8a0d-b8ebbbf6dea6.png');
  
  return (
    <mesh
      ref={meshRef}
      rotation={[0, Math.PI / 4, 0]}
      scale={1.5}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

const Hero3D = () => {
  return (
    <section className="relative bg-sudevi-red text-white overflow-hidden h-[90vh]">
      <div 
        className="absolute inset-0 bg-cover bg-center hero-gradient z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-[#ea384c]">
            Taste The Tradition
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in">
            Authentic Indian flavors crafted with care. Discover our range of pickles, spices, soya chunks and vermicelli.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button asChild size="lg" className="bg-white text-sudevi-red hover:bg-gray-100 rounded-md">
              <Link to="/products">Explore Our Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 rounded-md">
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full z-5 hidden lg:block">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Box />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default Hero3D;
