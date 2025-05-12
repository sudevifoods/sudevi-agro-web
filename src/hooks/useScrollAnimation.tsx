
import { useEffect } from 'react';

/**
 * A hook to handle scroll-based animations
 */
export const useScrollAnimation = () => {
  useEffect(() => {
    const scrollElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const elementInView = (el: Element, offset = 150) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
      );
    };

    const displayScrollElement = (element: Element) => {
      element.classList.add('active');
    };

    const hideScrollElement = (element: Element) => {
      element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };

    // Initialize animation on first load
    handleScrollAnimation();

    // Add event listener
    window.addEventListener('scroll', handleScrollAnimation);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);
};

export default useScrollAnimation;
