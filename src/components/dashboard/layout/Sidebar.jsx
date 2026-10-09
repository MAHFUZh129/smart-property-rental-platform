
"use client";
import Logo from "@/components/shared/Logo";
import { X, Headset, ArrowUpRight, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, navItems, onClose, role }) => {


    const pathname = usePathname();

    const year = new Date().getFullYear()

    return (

        <div>
            {/* for mobile */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-screen w-70 flex-col border-r border-slate-200 bg-white text-slate-800 shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className=" h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
                    <Link
                        href="/"
                        onClick={onClose}
                    >
                        <Logo />

                        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
                            Workspace
                        </p>
                    </Link>

                    <button
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-7">
                    <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">
                        Main Menu
                    </p>

                    <nav className="space-y-1.5">
                        {navItems.map(({ label, href, icon: Icon }) => {


                            const isActive =
                                href === `/${role}/dashboard`
                                    ? pathname === href
                                    : pathname === href ||
                                    pathname.startsWith(`${href}/`);

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={onClose}
                                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-brand-50 text-brand-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-700"
                                        }`}
                                >
                                    {/* active indicator */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                                    )}

                                    {/* icon */}
                                    <span
                                        className={`flex size-9 items-center justify-center rounded-lg transition-all ${isActive
                                            ? "bg-brand-600 text-white shadow-sm shadow-brand-600/20"
                                            : "bg-slate-50 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600"
                                            }`}
                                    >
                                        <Icon size={18} strokeWidth={1.9} />
                                    </span>

                                    <span className="flex-1">{label}</span>

                                    {isActive && (
                                        <span className="size-1.5 rounded-full bg-brand-600" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* support Card */}
                <div className="shrink-0 px-4 pb-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                            <Headset size={20} />
                        </div>

                        <h3 className="text-sm font-semibold text-slate-800">
                            Need a hand?
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                            Our support team is here to help you.
                        </p>

                        <Link
                            href="/help"
                            onClick={onClose}
                            className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-brand-700 transition hover:border-brand-200 hover:bg-brand-50"
                        >
                            Help Center
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[10px] font-medium text-slate-400">
                        <p className="text-xs text-slate-500">
                            © {year} Rentora. All rights reserved.
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;