'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Notification from '@/components/Notification';
import { supabase } from '@/lib/supabase';

export default function Protected() {
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto p-6">
          <div className="bg-white rounded-xl border border-[#d4cdb7] p-6 shadow-sm">
            <h1 className="text-2xl font-mono text-[#2d4544] mb-6">Protected Area</h1>
            <p className="text-[#5c8d89]">
              This is a protected area. Your API key is being validated...
            </p>
          </div>
        </div>

        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onHide={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-xl border border-[#d4cdb7] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-mono text-[#2d4544]">Protected Area</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-[#5c8d89] hover:bg-[#e6e0d0] rounded-lg transition-colors font-mono"
            >
              Logout
            </button>
          </div>
          <p className="text-[#5c8d89]">
            Welcome to the protected area! You have successfully authenticated with a valid API key.
          </p>
        </div>
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onHide={() => setNotification(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
} 