'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [animatedText, setAnimatedText] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const { data: session } = useSession();

  const handleMouseEnter = () => {
    setIsCollapsed(false);
    menuItems.forEach((item) => {
      const text = item.name;
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < text.length) {
          currentText = text.slice(0, currentText.length + 1);
          setAnimatedText(prev => ({
            ...prev,
            [item.name]: currentText
          }));
        } else {
          clearInterval(interval);
        }
      }, 20);
    });
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
    setAnimatedText({});
  };

  useEffect(() => {
    // Initialize animated text
    const initialText = {};
    menuItems.forEach(item => {
      initialText[item.name] = isCollapsed ? '' : item.name;
    });
    setAnimatedText(initialText);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const menuItems = [
    {
      name: 'Overview',
      icon: '🏠',
      href: '/dashboard',
      active: pathname === '/dashboard'
    },
    {
      name: 'Research Assistant',
      icon: '🔍',
      href: '/research-assistant',
      active: pathname === '/research-assistant'
    },
    {
      name: 'Research Reports',
      icon: '📄',
      href: '/research-reports',
      active: pathname === '/research-reports'
    },
    {
      name: 'API Playground',
      icon: '⚡',
      href: '/playground',
      active: pathname === '/playground'
    },
    {
      name: 'Invoices',
      icon: '📋',
      href: '/invoices',
      active: pathname === '/invoices'
    },
    {
      name: 'Documentation',
      icon: '📚',
      href: '/documentation',
      active: pathname === '/documentation',
      isExternal: true
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-[#f5f1e4] border border-[#d4cdb7] shadow-sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6 text-[#2d4544]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <aside 
        className={`min-h-screen bg-[#f5f1e4] border-r border-[#d4cdb7] shadow-[2px_0_12px_-2px_rgba(0,0,0,0.1)] relative z-20 transition-all duration-300 ${
          isCollapsed ? 'w-20 hover:w-64' : 'w-64'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-[#d4cdb7]">
          <Link href="/dashboard" className="flex items-center no-underline">
            <div className="relative w-full">
              <span className={`text-xl font-mono font-semibold text-[#2d4544] absolute left-0 transition-all duration-300 ${
                isCollapsed ? 'opacity-100' : 'opacity-0'
              }`}>
                W
              </span>
              <span className={`text-xl font-mono font-semibold text-[#2d4544] transition-all duration-300 ${
                isCollapsed ? 'opacity-0' : 'opacity-100'
              }`}>
                WAPIM
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 my-1 rounded-lg transition-all duration-200 font-mono group
                ${item.active 
                  ? 'bg-[#5c8d89] text-white shadow-sm' 
                  : 'text-[#2d4544] hover:bg-[#e6e0d0] hover:shadow-sm'}`}
              {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={isCollapsed ? item.name : ''}
            >
              <span className="text-xl min-w-[1.5rem]">{item.icon}</span>
              <span className={`text-sm whitespace-nowrap transition-all duration-300 overflow-hidden ${
                isCollapsed ? 'w-0' : 'w-auto'
              }`}>
                {animatedText[item.name] || ''}
              </span>
              {item.isExternal && !isCollapsed && (
                <span className="ml-auto opacity-60">↗</span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#d4cdb7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || 'User'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#e6e0d0] flex items-center justify-center">
                  👤
                </div>
              )}
            </div>
            <div className={`flex-1 transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto' : 'opacity-100'
            }`}>
              <div className="text-sm font-mono text-[#2d4544] whitespace-nowrap">
                {session?.user?.name || 'User'}
              </div>
              <div className="text-xs text-[#5c8d89] whitespace-nowrap">
                {session?.user?.email || 'user@example.com'}
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className={`text-[#5c8d89] hover:text-[#2d4544] transition-colors p-2 rounded-lg hover:bg-[#e6e0d0] hover:shadow-sm ${
                  isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
                }`}
                title="Settings"
              >
                ⚙️
              </button>
              
              {/* Logout Menu */}
              {showLogoutMenu && !isCollapsed && (
                <div className="absolute right-0 bottom-full mb-2 w-40 bg-white rounded-lg shadow-lg border border-[#d4cdb7] overflow-hidden z-30">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#2d4544] hover:bg-[#e6e0d0] transition-colors flex items-center gap-2"
                  >
                    <span>🚪</span>
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Click outside to close logout menu */}
      {showLogoutMenu && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setShowLogoutMenu(false)}
        />
      )}
    </>
  );
} 