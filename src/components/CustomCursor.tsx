"use client";
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer ring - unchanged */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-teal-400 rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out hidden md:block"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${hovered ? 1.5 : 1})`,
          opacity: 0.8,
        }}
      />
      
      {/* Inner dot - REDUCED SIZE from w-3 h-3 (12px) to w-2 h-2 (8px) */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-400 rounded-full pointer-events-none z-[9999] hidden md:block transition-all duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${clicked ? 0.8 : 1})`,
          boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
        }}
      />

      {/* Glow effect on hover - unchanged */}
      {hovered && (
        <div
          className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.2) 0%, transparent 70%)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;