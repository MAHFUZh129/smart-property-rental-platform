import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div>
            <section className="relative overflow-hidden bg-white pt-16 pb-40 sm:pt-24 sm:pb-48">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                    {/* Copy */}
                    <div className="lg:col-span-6">
                        <p className="text-sm font-medium text-brand-600">
                            12,400+ homes listed across 40 cities
                        </p>
                        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-slate-900 sm:text-6xl">
                            Find a place that actually feels like yours.
                        </h1>
                        <p className="mt-6 max-w-md text-lg text-slate-600">
                            Browse verified listings, message landlords directly, and handle
                            your lease, rent, and maintenance requests in one place —
                            no phone tag, no paperwork.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href="/properties"
                                className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                            >
                                Browse properties
                            </a>
                            <a
                                href="/register?role=landlord"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900"
                            >
                                List your property
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* photo  */}
                    <div className="relative lg:col-span-6">
                        <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">

                            {/* Image 1 */}
                            <div className="col-span-3 row-span-4 overflow-hidden rounded-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                    alt="Modern living room"
                                    width={800}
                                    height={500}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            {/* Image 2 */}

                            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                                    alt="Apartment exterior"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Rating */}
                            <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl bg-brand-600 p-5 text-white">
                                <p className="font-serif text-3xl leading-tight">4.8</p>

                                <p className="mt-1 text-sm text-brand-100">
                                    average tenant rating across the platform
                                </p>
                            </div>

                            {/* Image 3 */}
                            <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                                    alt="Bright kitchen"
                                    width={800}
                                    height={500}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;