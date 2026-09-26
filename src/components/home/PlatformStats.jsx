import React from "react";
import {
    Building2,
    Users,
    BadgeCheck,
    Star,
} from "lucide-react";

const stats = [
    {
        value: "12,400+",
        label: "Active listings",
        icon: Building2,
    },
    {
        value: "38,000+",
        label: "Tenants housed",
        icon: Users,
    },
    {
        value: "3,200+",
        label: "Verified landlords",
        icon: BadgeCheck,
    },
    {
        value: "4.8/5",
        label: "Average rating",
        icon: Star,
    },
];

const PlatformStats = () => {
    return (
        <section className="border-y border-slate-200/70 bg-white py-14 sm:py-16">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 sm:grid-cols-4 sm:gap-y-0 lg:px-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className={`flex items-center gap-4 sm:justify-center ${
                                index !== 0
                                    ? "sm:border-l sm:border-slate-200/70"
                                    : ""
                            }`}
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200/70">
                                <Icon
                                    className="h-5 w-5 text-slate-600"
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div>
                                <p className="font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-500">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default PlatformStats;
