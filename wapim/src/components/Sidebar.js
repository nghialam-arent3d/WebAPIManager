'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [animatedText, setAnimatedText] = useState({});

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
      href: '/api-playground',
      active: pathname === '/api-playground'
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
      <aside 
        className={`min-h-screen bg-[#f5f1e4] border-r border-[#d4cdb7] shadow-[2px_0_12px_-2px_rgba(0,0,0,0.1)] relative z-20 transition-all duration-300 ${
          isCollapsed ? 'w-20 hover:w-64' : 'w-64'
        }`}
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
        <nav className="px-4 py-4">
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
        <div className={`absolute bottom-0 w-full p-4 border-t border-[#d4cdb7] bg-[#f5f1e4] shadow-[0_-1px_3px_rgba(0,0,0,0.05)] transition-all duration-300`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e6e0d0] flex items-center justify-center shadow-sm flex-shrink-0">
              👤
            </div>
            <div className={`flex-1 transition-all duration-300 ${
              isCollapsed ? 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto' : 'opacity-100'
            }`}>
              <div className="text-sm font-mono text-[#2d4544] whitespace-nowrap">User Name</div>
              <div className="text-xs text-[#5c8d89] whitespace-nowrap">user@example.com</div>
            </div>
            <button className={`text-[#5c8d89] hover:text-[#2d4544] transition-colors p-2 rounded-lg hover:bg-[#e6e0d0] hover:shadow-sm ${
              isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
            }`}>⚙️</button>
          </div>
        </div>
      </aside>
    </>
  );
} 