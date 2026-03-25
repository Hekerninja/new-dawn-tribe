"use client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnicornScene from "unicornstudio-react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  // Set mounted state after first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle splash screen timeout  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        navigate('/');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isMounted, navigate]);

  if (!showSplash) {
    return null; // Return null to let the main app render
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      {isMounted ? (
        <UnicornScene
          projectId="iyIONavMejpegLJVgYuB"
          width="1440px"
          height="900px"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
        />
      ) : (
        // Fallback while waiting for mount
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-white">Loading New Dawn Tribe...</p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;