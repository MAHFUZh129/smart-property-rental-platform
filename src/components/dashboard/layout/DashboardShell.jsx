"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getNavItems } from '@/data/dashboard/dashboard-nav';

const DashboardShell = ({unreadCount, user, role, children }) => {

  const navItems = getNavItems(role)

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar
        role={role}
        navItems={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-70">
        <div className="sticky top-0 z-50">
          <Topbar
            user={user}
            role={role}
            unreadCount={unreadCount}
            onMenuClick={() => setSidebarOpen(true)}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;