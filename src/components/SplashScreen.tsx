"use client";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UnicornScene from "unicornstudio-react";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the main page after 10 seconds
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
        <div className="w-full h-full flex items-center justify-center">
          <UnicornScene
            projectId="iyIONavMejpegLJVgYuB"
            width={800}
            height={600}
            className="max-w-full max-h-full"
          />
        </div>
      </div>
    );
  }

  return null;
};

export default SplashScreen;