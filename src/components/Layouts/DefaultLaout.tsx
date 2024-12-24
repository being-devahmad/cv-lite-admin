'use client';
import React, { useState, ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the page is part of the authentication routes (e.g., '/auth/login')
  const isAuthPage = pathname.startsWith('/auth'); 

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* If it's not an auth page, render the sidebar and header */}
      {!isAuthPage && (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          {/* Content Area */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* Header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* Main Content */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* If it's an auth page, only render the main content */}
      {isAuthPage && (
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      )}
    </>
  );
}
