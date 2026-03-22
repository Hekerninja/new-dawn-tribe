"use client";
import React, { useEffect, useState } from 'react';
import { useSobrietyTracker } from '@/contexts/SobrietyTrackerContext';
import { Database, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DatabaseStatus = () => {
  const { checkDatabaseStatus } = useSobrietyTracker();
  const [status, setStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      setStatus('checking');
      try {
        const isConnected = await checkDatabaseStatus();
        setStatus(isConnected ? 'connected' : 'error');
      } catch (error) {
        console.error('Database status check error:', error);
        setStatus('error');
      }
    };

    checkStatus();
  }, [checkDatabaseStatus]);

  const getStatusInfo = () => {
    switch (status) {
      case 'idle':
        return { icon: <Database className="w-4 h-4" />, text: 'Database not checked', color: 'text-gray-400' };
      case 'checking':
        return { icon: <Loader2 className="w-4 h-4 animate-spin" />, text: 'Checking connection...', color: 'text-yellow-400' };
      case 'connected':
        return { icon: <CheckCircle className="w-4 h-4" />, text: 'Database connected', color: 'text-green-400' };
      case 'error':
        return { icon: <AlertTriangle className="w-4 h-4" />, text: 'Connection error', color: 'text-red-400' };
      default:
        return { icon: <Database className="w-4 h-4" />, text: 'Unknown status', color: 'text-gray-400' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="fixed bottom-4 right-4 z-[10000]">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setShowDetails(!showDetails)}
          size="sm"
          variant="outline"
          className={`border-white/20 hover:bg-white/10 ${statusInfo.color} gap-2`}
        >
          {statusInfo.icon}
          <span>{statusInfo.text}</span>
        </Button>
      </div>

      {showDetails && (
        <div className="mt-2 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 max-w-xs">
          <h4 className="font-semibold text-white mb-2">Database Status</h4>
          <p className="text-sm text-gray-300 mb-2">
            {status === 'connected' ? 'Successfully connected to Firestore' :
             status === 'error' ? 'Failed to connect to database' :
             'Checking database connection...'}
          </p>
          <Button
            onClick={() => setShowDetails(false)}
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default DatabaseStatus;