"use client";
import { useEffect } from 'react';

export const FaviconGenerator = () => {
  useEffect(() => {
    // This component ensures the favicon is properly loaded
    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (link) {
      link.href = '/favicon.svg';
    }
  }, []);

  return null;
};