"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set timeout to redirect after 8 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <iframe
        src="https://unicorn.studio"
        title="Unicorn Studio"
        className="w-full h-full border-none"
        allowFullScreen
      />
    </div>
  );
};

export default SplashScreen;