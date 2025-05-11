
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: React.DetailedHTMLProps<any, any> & { ref?: React.RefObject<THREE.Mesh> };
      boxGeometry: React.DetailedHTMLProps<any, any>;
      meshStandardMaterial: React.DetailedHTMLProps<any, any> & { map?: THREE.Texture };
      ambientLight: React.DetailedHTMLProps<any, any>;
      spotLight: React.DetailedHTMLProps<any, any>;
      directionalLight: React.DetailedHTMLProps<any, any>;
      // Add other Three.js elements as needed
      group: React.DetailedHTMLProps<any, any>;
      sphereGeometry: React.DetailedHTMLProps<any, any>;
      planeGeometry: React.DetailedHTMLProps<any, any>;
      meshBasicMaterial: React.DetailedHTMLProps<any, any>;
      meshPhongMaterial: React.DetailedHTMLProps<any, any>;
      meshLambertMaterial: React.DetailedHTMLProps<any, any>;
      pointLight: React.DetailedHTMLProps<any, any>;
      hemisphereLight: React.DetailedHTMLProps<any, any>;
    }
  }
}
