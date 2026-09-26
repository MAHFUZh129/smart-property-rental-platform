
import RegisterForm from "@/components/register/RegisterForm";
import React from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import Logo from "@/components/shared/Logo";

const Register = () => {
    return (
        <div className=" bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">

                {/* Left Side */}
                <div className="hidden flex-col justify-center px-10 py-16 lg:flex xl:px-16">
                    <div className="max-w-md">

                        {/* Logo */}
                        <div className="mb-8 flex items-center gap-3">
                           

                           <Logo></Logo>
                        </div>

                        <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
                            <Sparkles size={16} />
                            Your smarter way to rent
                        </p>

                        <h1 className="text-4xl font-bold leading-tight text-slate-900 xl:text-5xl dark:text-white">
                            Find a place you’ll
                            <span className="block text-slate-500 dark:text-slate-300">
                                love to call home.
                            </span>
                        </h1>

                        <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">
                            Create your Rentora account and discover properties,
                            manage rentals, and connect with trusted landlords
                            from one place.
                        </p>

                        {/* Feature */}
                        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                                <ShieldCheck size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    Safe & trusted
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Your information stays secure.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center px-5 py-12 sm:px-8">
                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
                           <Logo></Logo>
                        </div>

                        {/* Form Card */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                            <RegisterForm />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
