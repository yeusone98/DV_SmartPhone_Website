import React, { useState } from 'react';

const TestComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: '100vw',
        height: '100vh',
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(230, 43, 130, 0.5), rgba(0, 0, 0, 1))`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '2rem',
      }}
    >
      Move your mouse!
    </div>
  );
};

export default TestComponent;
