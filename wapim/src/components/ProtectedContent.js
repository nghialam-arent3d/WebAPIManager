'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Notification from '@/components/Notification';
import FallingLeaves from '@/components/FallingLeaves';
import { supabase } from '@/lib/supabase';

export default function ProtectedContent() {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [isValidated, setIsValidated] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiKey = searchParams.get('key');

  useEffect(() => {
    const validateApiKey = async () => {
      // Check if we already have a valid API key in localStorage
      const storedKey = localStorage.getItem('validApiKey');
      if (storedKey) {
        setIsValidated(true);
        return;
      }

      if (!apiKey) {
        router.push('/playground');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .eq('key', apiKey)
          .single();

        if (error) throw error;

        if (data) {
          // Store the valid API key in localStorage
          localStorage.setItem('validApiKey', apiKey);
          setIsValidated(true);
          setNotification({
            show: true,
            message: 'Valid API key, /protected can be accessed',
            type: 'success'
          });
        } else {
          setNotification({
            show: true,
            message: 'Invalid API key',
            type: 'error'
          });
          setTimeout(() => {
            router.push('/playground');
          }, 2000);
        }
      } catch (error) {
        console.error('Error validating API key:', error);
        setNotification({
          show: true,
          message: 'Error validating API key',
          type: 'error'
        });
        setTimeout(() => {
          router.push('/playground');
        }, 2000);
      }
    };

    validateApiKey();
  }, [apiKey, router]);

  const handleLogout = () => {
    localStorage.removeItem('validApiKey');
    router.push('/playground');
  };

  if (!isValidated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
        <FallingLeaves />
        <div className="max-w-md w-full relative z-10">
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <h1 className="text-2xl font-mono text-brand-text mb-6">Protected Area</h1>
            <p className="text-brand-primary">
              This is a protected area. Your API key is being validated...
            </p>
          </div>
        </div>

        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FallingLeaves />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-xl border border-brand-border p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-mono text-brand-text">Protected Area</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-brand-primary hover:bg-gray-100 rounded-lg transition-colors font-mono transform hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </div>
          <p className="text-brand-primary">
            Welcome to the protected area! You have successfully authenticated with a valid API key.
          </p>
        </div>
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
} 