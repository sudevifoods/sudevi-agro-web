
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: React.DetailedHTMLProps<any, any> & { ref?: React.RefObject<THREE.Mesh> };
      boxGeometry: React.DetailedHTMLProps<any, any>;
      meshStandardMaterial: React.DetailedHTMLProps<any, any> & { map?: THREE.Texture };
      ambientLight: React.DetailedHTMLProps<any, any>;
      spotLight: React.DetailedHTMLProps<any, any>;
    }
  }
}

interface ProductViewerProps {
  imageUrl: string;
  rotation?: boolean;
}

const Product = ({ imageUrl, rotation = true }: ProductViewerProps) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useTexture(imageUrl);
  
  useFrame((state) => {
    if (rotation && mesh.current) {
      mesh.current.rotation.y += 0.005;
    }
  });
  
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const ProductViewer = ({ imageUrl, rotation }: ProductViewerProps) => {
  return (
    <div className="h-60 w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Product imageUrl={imageUrl} rotation={rotation} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ProductViewer;
