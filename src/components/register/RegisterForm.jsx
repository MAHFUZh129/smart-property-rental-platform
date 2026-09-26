
"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Home, Building2 } from "lucide-react";
// import { registerUser } from "@/app/actions/auth";
import React, { useState } from 'react';

const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(registerSchema),
        defaultValues: { role: "tenant" },
    });

    // const role = watch("role");

    async function onSubmit(values) {
        setServerError("");
        setSubmitting(true);
        try {
            const result = await registerUser(values);

            if (!result.success) {
                setServerError(result.message);
                return;
            }

            // Auto sign-in after successful registration
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            router.push(values.role === "landlord" ? "/landlord/dashboard" : "/tenant/dashboard");
        } catch (err) {
            setServerError("Couldn't reach the server. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className="w-full  max-w-md">
            <h1 className="font-serif text-3xl text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm text-slate-600">
                Already have one?{" "}
                <a href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
                    Log in
                </a>
            </p>

            {/* Role toggle */}
            <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    // onClick={() => setValue("role", "tenant", { shouldValidate: true })}
                    // className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${role === "tenant"
                    //         ? "border-brand-600 bg-brand-50"
                    //         : "border-slate-200 hover:border-slate-300"
                    //     }`}
                >
                    <Home
                        // className={`h-5 w-5 ${role === "tenant" ? "text-brand-600" : "text-slate-400"}`}
                    />
                    <div>
                        <p className="text-sm font-semibold text-slate-900">I'm a tenant</p>
                        <p className="text-xs text-slate-500">Looking to rent</p>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => setValue("role", "landlord", { shouldValidate: true })}
                    // className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${role === "landlord"
                    //         ? "border-brand-600 bg-brand-50"
                    //         : "border-slate-200 hover:border-slate-300"
                    //     }`}
                >
                    <Building2
                        // className={`h-5 w-5 ${role === "landlord" ? "text-brand-600" : "text-slate-400"}`}
                    />
                    <div>
                        <p className="text-sm font-semibold text-slate-900">I'm a landlord</p>
                        <p className="text-xs text-slate-500">Listing a property</p>
                    </div>
                </button>
            </div>

            <form 
            // onSubmit={handleSubmit(onSubmit)} 
            className="mt-6 space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Full name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Jordan Lee"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <div className="relative mt-1.5">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                            placeholder="At least 8 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <label className="flex items-start gap-2 pt-1">
                    <input
                        type="checkbox"
                        {...register("agreeToTerms")}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-slate-600">
                        I agree to the{" "}
                        <a href="/terms" className="font-medium text-brand-600 hover:text-brand-700">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="font-medium text-brand-600 hover:text-brand-700">
                            Privacy Policy
                        </a>
                    </span>
                </label>
                {errors.agreeToTerms && (
                    <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
                )}

                {serverError && (
                    <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">{serverError}</p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? "Creating account…" : "Create account"}
                </button>
            </form>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400">or</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/tenant/dashboard" })}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"
                    />
                </svg>
                Continue with Google
            </button>
        </div>
    );
};

export default RegisterForm;
