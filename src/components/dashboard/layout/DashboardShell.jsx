"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getNavItems } from '@/data/dashboard-Nav/dashboard-nav';

const DashboardShell = ({user, role, children }) => {

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
        <Topbar user={user} role={role} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;