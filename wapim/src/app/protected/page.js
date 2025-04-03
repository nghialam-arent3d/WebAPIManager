import { Suspense } from 'react';
import ProtectedContent from '@/components/ProtectedContent';

export default function Protected() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto p-6">
          <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm">
            <h1 className="text-2xl font-mono text-brand-text mb-6">Protected Area</h1>
            <p className="text-brand-primary">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ProtectedContent />
    </Suspense>
  );
} 