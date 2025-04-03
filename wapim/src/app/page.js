'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f5e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#2d4544] sm:text-5xl md:text-6xl">
              WebAPI Manager
            </h1>
            <p className="mt-3 text-base text-[#5c8d89] sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              A modern, secure way to manage your API keys and monitor usage
            </p>
            <div className="mt-5 sm:mt-8 flex justify-center">
              <div className="rounded-md shadow">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5c8d89] hover:bg-[#4a7571] transition-colors md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
            <div className="pt-6">
              <div className="flow-root bg-white/80 backdrop-blur-sm rounded-xl border border-[#d4cdb7] px-8 pb-8 h-full">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-4 bg-[#5c8d89] rounded-md shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-xl font-medium text-[#2d4544] tracking-tight">Secure Key Management</h3>
                  <p className="mt-5 text-lg text-[#5c8d89] leading-relaxed">
                    Generate and manage API keys securely. Control access and monitor usage in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white/80 backdrop-blur-sm rounded-xl border border-[#d4cdb7] px-8 pb-8 h-full">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-4 bg-[#5c8d89] rounded-md shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-xl font-medium text-[#2d4544] tracking-tight">Usage Analytics</h3>
                  <p className="mt-5 text-lg text-[#5c8d89] leading-relaxed">
                    Track API usage, monitor performance, and get insights into your API consumption.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white/80 backdrop-blur-sm rounded-xl border border-[#d4cdb7] px-8 pb-8 h-full">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-4 bg-[#5c8d89] rounded-md shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="mt-8 text-xl font-medium text-[#2d4544] tracking-tight">Rate Limiting</h3>
                  <p className="mt-5 text-lg text-[#5c8d89] leading-relaxed">
                    Set and manage rate limits for your API keys to control and optimize usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
