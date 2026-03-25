"use client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnicornScene from "unicornstudio-react";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      navigate('/');
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!showSplash) {
    return null; // Return null to let the main app render
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <UnicornScene
        projectId="iyIONavMejpegLJVgYuB"
        width="1440px"
        height="900px"
        scale={1}
        dpi={1.5}
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
      />
    </div>
  );
};

export default SplashScreen;