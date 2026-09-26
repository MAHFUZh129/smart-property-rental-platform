import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const featured = [
    {
        id: 1,
        title: "Riverside Loft with Skyline View",
        city: "Austin, TX",
        price: 2400,
        beds: 2,
        baths: 2,
        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    },
    {
        id: 2,
        title: "Sunlit Garden Apartment",
        city: "Portland, OR",
        price: 1750,
        beds: 1,
        baths: 1,
        image:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
    },
];

const FeaturedProperties = () => {
    return (
        <div className="bg-brand-50 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl">
                        Featured this week
                    </h2>
                    <a href="/properties?sort=featured" className="text-sm font-semibold text-brand-700">
                        View all
                    </a>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {featured.map((p) => (
                        <a
                            key={p.id}
                            href={`/properties/${p.id}`}
                            className="group overflow-hidden rounded-2xl bg-white"
                        >
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-115"

                                />
                                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700">
                                    Featured
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-serif text-xl text-slate-900">{p.title}</h3>
                                        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {p.city}
                                        </p>
                                    </div>
                                    <p className="whitespace-nowrap text-lg font-semibold text-slate-900">
                                        ${p.price.toLocaleString()}
                                        <span className="text-sm font-normal text-slate-500">/month</span>
                                    </p>
                                </div>
                                <p className="mt-3 text-sm text-slate-500">
                                    {p.beds} bed · {p.baths} bath
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProperties;