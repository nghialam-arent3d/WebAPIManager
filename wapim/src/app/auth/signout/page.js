'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: '/' });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Signing out...</h2>
        <p className="mt-2 text-gray-600">Please wait while we sign you out.</p>
      </div>
    </div>
  );
} 