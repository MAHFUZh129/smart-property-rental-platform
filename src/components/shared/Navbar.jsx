"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    Home,
    Building2,
    Search,
    ChevronDown,
    User,
    Settings,
    LogOut,
    LayoutDashboard,
} from "lucide-react";

import Logo from "./Logo";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { NAV_LINKS, PROPERTY_TYPES } from "@/data/navbar/nav-data";



const Navbar = () => {

    const [propertiesOpen, setPropertiesOpen] = useState(false);
    const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);


    const pathname = usePathname();
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    // close the mobile menu 
    const { data: session, status } = useSession()

    // console.log({ session, status })

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false);
            }
        };

        const onScroll = () => {
            if (window.scrollY > 8) {
                setScrolled(true);
            }
            else {
                setScrolled(false);
            }
        };



        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Close Properties dropdown 
    useEffect(() => {
        const onClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setPropertiesOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    // for profile
    useEffect(() => {
        const onClick = (e) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", onClick);

        return () => {
            document.removeEventListener("mousedown", onClick);
        };
    }, []);

    const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${scrolled
                ? "border-slate-200/80 bg-white/85 shadow-[0_8px_30px_-12px_rgba(2,132,199,0.25)]"
                : "border-transparent bg-white/60"
                }`}
        >
            <div className="h-[2px] w-full bg-gradient-to-r from-brand-400 via-brand-600 to-cyan-500" />

            <nav className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
                    <Logo />
                </Link>

                {/* desktop links */}
                <ul className="hidden lg:flex lg:items-center lg:gap-1">
                    {NAV_LINKS.map((link) =>
                        link.hasMenu ? (
                            <li key={link.href} ref={dropdownRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setPropertiesOpen((v) => !v)}
                                    // onClick={() => setPropertiesOpen(true)}
                                    // aria-expanded={propertiesOpen}
                                    className={`group flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(link.href) || propertiesOpen
                                        ? "text-brand-700"
                                        : "text-slate-600 hover:text-brand-700"
                                        }`}
                                >
                                    <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-600 after:transition-all after:duration-300 after:content-[''] after:w-0 group-hover:after:w-full">
                                        {link.label}
                                    </span>
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${propertiesOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* mega-dropdown */}
                                <div
                                    className={`absolute left-1/2 top-full z-20 w-[30rem] -translate-x-1/2 pt-3 transition-all duration-200 ${propertiesOpen
                                        ? "pointer-events-auto translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-2 opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-15px_rgba(2,132,199,0.3)]">
                                        <div className="grid grid-cols-2 gap-1 p-3">
                                            {PROPERTY_TYPES.map(({ label, href, Icon, blurb }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    onClick={() => setPropertiesOpen(false)}
                                                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                                                >
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                                                        <Icon className="h-4.5 w-4.5" />
                                                    </span>
                                                    <span>
                                                        <span className="block text-sm font-semibold text-slate-800">
                                                            {label}
                                                        </span>
                                                        <span className="mt-0.5 block text-xs text-slate-500">
                                                            {blurb}
                                                        </span>
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link
                                            href="/properties"
                                            onClick={() => setPropertiesOpen(false)}
                                            className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                                        >
                                            Browse all properties
                                            <span aria-hidden>›</span>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`group relative inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(link.href)
                                        ? "text-brand-700"
                                        : "text-slate-600 hover:text-brand-700"
                                        }`}
                                >
                                    <span
                                        className={`relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-600 after:transition-all after:duration-300 after:content-[''] ${isActive(link.href) ? "after:w-full" : "after:w-0 group-hover:after:w-full"
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                </Link>
                            </li>
                        )
                    )}
                </ul>

                {/* desktop right side */}
                <div className="hidden lg:flex lg:items-center lg:gap-3">

                    {/* find a place */}
                    <Link
                        href="/properties"
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm text-slate-500 transition-all hover:border-brand-300 hover:text-brand-700 hover:shadow-sm"
                    >
                        <Search className="h-4 w-4" />
                        Find a place
                    </Link>

                    <div className="mx-1 h-6 w-px bg-slate-200" />

                    {/* Loading */}
                    {status === "loading" ? (
                        <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
                    ) : session ? (

                        // log in
                        <div
                            ref={profileRef}
                            className="relative"
                        >

                            {/* Profile Button */}
                            <button
                                type="button"
                                onClick={() => setProfileOpen((value) => !value)}
                                className="group flex items-center gap-2 rounded-full border border-transparent p-1.5 pr-2.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
                            >

                                {/* Profile Image */}
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user?.name || "Profile"}
                                        width={90}
                                        height={90}
                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"

                                    />

                                ) : (
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-sm">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}

                                {/* User info */}
                                <div className="hidden xl:block text-left">
                                    <p className="max-w-28 truncate text-sm font-semibold text-slate-800">
                                        {session.user?.name
                                            ?.split(" ")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ") || "User"}

                                    </p>

                                    <p className="text-xs capitalize  text-slate-500">
                                        {session.user?.role || "Tenant"}
                                    </p>
                                </div>

                                {/* Chevron */}
                                <ChevronDown
                                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>


                            {/* profile dropdown */}
                            <div
                                className={`absolute right-0 top-full z-50 mt-3 w-72 origin-top-right transition-all duration-200 ${profileOpen
                                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                                    }`}
                            >

                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]">

                                    {/* User Header */}
                                    <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-4 py-4">

                                        <div className="flex items-center gap-3">

                                            {session.user?.image ? (
                                                <Image
                                                    src={session.user.image}
                                                    alt={session.user?.name || "Profile"}
                                                    width={90}
                                                    height={90}
                                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"

                                                />

                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-white shadow-md">
                                                    <User className="h-6 w-6" />
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-slate-900">
                                                    {session.user?.name
                                                        ?.split(" ")
                                                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(" ") || "User"}


                                                </p>

                                                <p className="mt-0.5 truncate text-xs text-slate-500">
                                                    {session.user?.email}
                                                </p>

                                                <span className="mt-1 inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold capitalize text-brand-700">
                                                    {session.user?.role || "tenant"}
                                                </span>
                                            </div>

                                        </div>
                                    </div>


                                    {/* menu Items */}
                                    <div className="p-2">

                                        {/* dshboard */}
                                        <Link
                                            href={`${session.user?.role}/dashboard`}
                                            onClick={() => setProfileOpen(false)}
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-brand-50 hover:text-brand-700"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-white group-hover:text-brand-600">
                                                <LayoutDashboard className="h-4 w-4" />
                                            </span>

                                            <span>Dashboard</span>
                                        </Link>


                                        {/* profile */}
                                        <Link
                                            href="/profile"
                                            onClick={() => setProfileOpen(false)}
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-brand-50 hover:text-brand-700"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-white group-hover:text-brand-600">
                                                <User className="h-4 w-4" />
                                            </span>

                                            <span>Profile</span>
                                        </Link>


                                        {/* Settings */}
                                        <Link
                                            href="/settings"
                                            onClick={() => setProfileOpen(false)}
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-brand-50 hover:text-brand-700"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-white group-hover:text-brand-600">
                                                <Settings className="h-4 w-4" />
                                            </span>

                                            <span>Settings</span>
                                        </Link>

                                    </div>


                                    {/* logout */}
                                    <div className="border-t border-slate-100 p-2">

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setProfileOpen(false);

                                                signOut({ callbackUrl: '/api/auth/signin?callbackUrl=/' });
                                            }}
                                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
                                        >
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                                                <LogOut className="h-4 w-4" />
                                            </span>

                                            <span>Logout</span>
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ) : (

                        // log-in or register
                        <>
                            <button
                                type="button"
                                onClick={() => signIn()}
                                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-brand-700"
                            >
                                Log in
                            </button>

                            <Link
                                href="/register"
                                className="relative overflow-hidden rounded-md bg-gradient-to-r from-brand-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/40"
                            >
                                Get started
                            </Link>
                        </>
                    )}

                </div>

                {/* mobile menu toggle */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700 lg:hidden"
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            {/* mobile menu */}
            <div
                className={`overflow-hidden border-t border-slate-200 bg-white transition-[max-height] duration-300 ease-in-out lg:hidden ${open ? "max-h-[34rem] overflow-y-auto" : "max-h-0 border-t-0"
                    }`}
            >
                <div className="px-4 py-3">
                    <Link
                        href="/properties"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-500"
                    >
                        <Search className="h-4 w-4" />
                        Search properties…
                    </Link>
                </div>

                <ul className="flex flex-col gap-0.5 px-4 pb-2">
                    {NAV_LINKS.map((link) =>
                        link.hasMenu ? (
                            <li key={link.href}>
                                <button
                                    type="button"
                                    onClick={() => setMobilePropertiesOpen((v) => !v)}
                                    aria-expanded={mobilePropertiesOpen}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                                >
                                    <span className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-slate-400" />
                                        {link.label}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${mobilePropertiesOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden pl-9 transition-[max-height] duration-300 ${mobilePropertiesOpen ? "max-h-96" : "max-h-0"
                                        }`}
                                >
                                    {PROPERTY_TYPES.map(({ label, href, Icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-2 rounded-md py-2 text-sm text-slate-500 hover:text-brand-700"
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </li>
                        ) : (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium hover:bg-brand-50 hover:text-brand-700 ${isActive(link.href) ? "text-brand-700" : "text-slate-700"
                                        }`}
                                >
                                    {link.label === "Home" && <Home className="h-4 w-4 text-slate-400" />}
                                    {link.label}
                                </Link>
                            </li>
                        )
                    )}
                </ul>
                {/* new */}
                <div className="border-t border-slate-100 px-4 py-4">

                    {status === "loading" ? (

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                            <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                        </div>

                    ) : session ? (

                        // log in for mobile
                        <div>

                            {/* User Info */}
                            <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user?.name || "Profile"}
                                        width={90}
                                        height={90}
                                        className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"

                                    />

                                ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-white">
                                        <User className="h-5 w-5" />
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-slate-900">
                                        {session.user?.name
                                            ?.split(" ")
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(" ") || "User"}                                  
                                    </p>

                                    <p className="truncate text-xs text-slate-500">
                                        {session.user?.email}
                                    </p>
                                </div>

                            </div>


                            {/* dashboard */}
                            <Link
                                href={`${session.user?.role}/dashboard`}
                                    
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>


                            {/* Profile */}
                            <Link
                                href="/profile"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>


                            {/* settings */}
                            <Link
                                href="/settings"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>


                            {/* Logout */}
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);

                                    signOut({ callbackUrl: '/api/auth/signin?callbackUrl=/' });
                                }}
                                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>

                        </div>

                    ) : (

                        // log out for moblie
                        <div className="flex flex-col gap-2">

                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    signIn();
                                }}
                                className="w-full rounded-md border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700"
                            >
                                Log in
                            </button>

                            <Link
                                href="/register"
                                onClick={() => setOpen(false)}
                                className="w-full rounded-md bg-gradient-to-r from-brand-600 to-cyan-600 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand-500/25"
                            >
                                Get started
                            </Link>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );
};

export default Navbar;