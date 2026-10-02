"use client"

import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import RoleBadge from '../ui/RoleBadge';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const UserMenu = ({ user, role }) => {

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);


  const handleToggle = () => {
    setOpen(!open);
  };

  //clicking outside of Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="relative" ref={menuRef}>

      {/* user menu button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
      >
        {/* User avatar */}
        <Image
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
          src={user.image}
          alt="User Image"
        />

        {/* User name */}
        <span className="hidden text-sm font-medium text-slate-900 sm:block">
          {user?.name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") || "Account"}
        </span>

        {/* dropdown arrow */}
        <ChevronDown className="size-4 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">

          {/* user information */}
          <div className="border-b border-slate-100 px-4 py-2.5">

            <p className="truncate  text-sm font-medium text-slate-900">
              {user?.name
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user?.email}
            </p>

            {/* User role */}
            <div className="mt-1.5">
              <RoleBadge role={role} />
            </div>

          </div>

          {/* Profile link */}
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 px-4 py-2 font-bold text-sm text-slate-600 hover:bg-slate-50"
          >
            <User className="size-4" />
            My profile
          </Link>

          {/* Settings link */}
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 font-bold text-sm text-slate-600 hover:bg-slate-50"
          >
            <Settings className="size-4" />
            Settings
          </button>

          {/* Logout */}
          <div className="border-t border-slate-100 px-2 pt-2">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Log out
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default UserMenu;