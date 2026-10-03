"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getNavItems } from '@/data/dashboard-Nav/dashboard-nav';

const DashboardShell = ({user, role, children }) => {

   const navItems = getNavItems(role)

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex  overflow-hidden bg-slate-50">
      <Sidebar
      role={role}
        navItems={navItems}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar user={user} role={role} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardShell;