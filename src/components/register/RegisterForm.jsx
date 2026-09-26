
"use client";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Home, Building2, Upload, X } from "lucide-react";
// import { registerUser } from "@/app/actions/auth";
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


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

    console.log(router)

    const onSubmit = async (values) => {
        setServerError("");
        console.log("1. onSubmit called");
    console.log("Before:", submitting);

    setSubmitting(true);

    console.log("2. setSubmitting(true) called",submitting);
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
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4">
                {/* name */}
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

                {/* image */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                        Profile Image
                    </label>
                    {
                        !selectedImage ? (
                            <label className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-slate-800">
                                    <Upload className="h-5 w-5 text-slate-500" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        Upload profile image
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        PNG, JPG or WEBP · Max 5MB
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", {
                                        onChange: (e) => {
                                            const file = e.target.files?.[0]
                                            setSelectedImage(file || null);
                                        }
                                    })}

                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-900">
                                {/* Image Preview */}
                                <Image
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Profile preview"
                                    width={60}
                                    height={40}
                                />

                                {/* File Information */}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200"> {selectedImage.name}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                                {/* Remove */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30" >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )
                    }

                </div>
                {/* email */}
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
                {/* password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <div className="relative mt-1.5">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },

                            })}
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
                {/* Confirm password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        {...register("confirmPassword",{
                            required:"Please confirm your password",
                            validate:(value)=>
                                 value === watch("password") || "Passwords do not match"
                            

                        })}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        placeholder="Re-enter your password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* agreeToTerms */}
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
                <FcGoogle size={28} />
                Continue with Google
            </button>
        </div>
    );
};

export default RegisterForm;
