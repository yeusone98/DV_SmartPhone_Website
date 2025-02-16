import { UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { ScrollButton } from './style';



const ScrollToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton 
      shape="circle"
      icon={<UpOutlined/>}
      onClick={scrollToTop}
      $visible={isVisible}
      aria-label="Scroll to top"
    />
  );
};

export default ScrollToTopComponent;