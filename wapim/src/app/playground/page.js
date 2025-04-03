'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '@/components/Notification';
import Sidebar from '@/components/Sidebar';
import { supabase } from '@/lib/supabase';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const router = useRouter();

  const validateApiKey = async (key) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key', key)
        .single();

      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        // Store the valid API key in localStorage
        localStorage.setItem('validApiKey', apiKey);
        router.push(`/protected?key=${encodeURIComponent(apiKey)}`);
      } else {
        setNotification({
          show: true,
          message: 'Invalid API key',
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: 'Error validating API key',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <div className="max-w-md mx-auto p-6">
          <div className="bg-white rounded-xl border border-[#d4cdb7] p-6 shadow-sm">
            <h1 className="text-2xl font-mono text-[#2d4544] mb-6">API Playground</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-[#5c8d89] mb-2">
                  Enter your API key to access the protected area
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full p-3 border border-[#d4cdb7] rounded-lg font-mono text-[#2d4544]
                           focus:outline-none focus:ring-2 focus:ring-[#5c8d89] transition-all"
                  autoComplete="off"
                  spellCheck="false"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#5c8d89] text-white rounded-lg hover:bg-[#4a7571] 
                         transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Validating...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        <Notification
          show={notification.show}
          message={notification.message}
          type={notification.type}
          onHide={() => setNotification(prev => ({ ...prev, show: false }))}
        />
      </div>
    </div>
  );
} 