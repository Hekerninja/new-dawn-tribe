"use client";
import React from 'react';

const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a1a]">
      {/* Deep space gradient base - simplified */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]" />
      
      {/* Reduced number of stars for better performance */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
              willChange: 'opacity',
            }}
          />
        ))}
      </div>

      {/* Simplified nebula effects - reduced blur and count */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-2xl" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-teal-600 rounded-full mix-blend-screen filter blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-600 rounded-full mix-blend-screen filter blur-2xl" />
      </div>

      {/* Simplified grid - removed base64, using CSS pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default CosmicBackground;