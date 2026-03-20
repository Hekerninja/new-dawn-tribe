"use client";
import React from 'react';

const CosmicBackground = () => {
  // Generate stars with random positions and animation delays
  const stars = React.useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a1a]">
      {/* Deep space gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]" />
      
      {/* Twinkling and moving stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite, move ${star.duration * 2}s linear ${star.delay}s infinite alternate`,
              willChange: 'opacity, transform',
            }}
          />
        ))}
      </div>

      {/* Nebula effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-teal-600 rounded-full mix-blend-screen filter blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-600 rounded-full mix-blend-screen filter blur-2xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Add keyframes for twinkle and move animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(1px, 1px); }
        }
      `}</style>
    </div>
  );
};

export default CosmicBackground;