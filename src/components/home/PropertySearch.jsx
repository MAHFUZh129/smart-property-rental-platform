'use client'
import { Home, MapPin, Search, Wallet } from 'lucide-react';
import React, { useState } from 'react';

const PropertySearch = () => {

    const [location, setLocation] = useState("");

    const [type, setType] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const  handleSearch =(e) =>{
        console.log(e.target.value)
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (type) params.set("type", type);
        if (maxPrice) params.set("maxPrice", maxPrice);
        window.location.href = `/properties?${params.toString()}`;
    }

    return (
        <div className="relative z-10 mx-auto -mt-24 max-w-5xl px-6 sm:-mt-28 lg:px-8">
            <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/50 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-slate-100 sm:p-2"
            >
                <label className="flex items-center gap-3 px-4 py-3">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="w-full">
                        <span className="block text-xs font-medium text-slate-500">Location</span>
                        <input
                            type="text"
                              value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City or neighborhood"
                            className="w-full border-0 p-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                        />
                    </div>
                </label>

                <label className="flex items-center gap-3 px-4 py-3">
                    <Home className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="w-full">
                        <span className="block text-xs font-medium text-slate-500">Type</span>
                        <select
                              value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border-0 bg-transparent p-0 text-sm text-slate-900 focus:outline-none focus:ring-0"
                        >
                            <option value="">Any type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="room">Room</option>
                            <option value="studio">Studio</option>
                            <option value="villa">Villa</option>
                            <option value="office">Office</option>
                        </select>
                    </div>
                </label>

                <label className="flex items-center gap-3 px-4 py-3">
                    <Wallet className="h-4 w-4 shrink-0 text-slate-400" />
                    <div className="w-full">
                        <span className="block text-xs font-medium text-slate-500">Max price</span>
                        <input
                            type="number"
                              value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Any price"
                            className="w-full border-0 p-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                        />
                    </div>
                </label>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                    <Search className="h-4 w-4" />
                    Search
                </button>
            </form>
        </div>
    );
};

export default PropertySearch;