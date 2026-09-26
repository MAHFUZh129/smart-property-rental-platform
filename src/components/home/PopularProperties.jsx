import { MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';


const popular = [
  {
    id: 3,
    title: "Downtown Studio",
    city: "Chicago, IL",
    price: 1350,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
  },
  {
    id: 4,
    title: "Craftsman House",
    city: "Denver, CO",
    price: 2100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
  },
  {
    id: 5,
    title: "Modern 2BR Unit",
    city: "Raleigh, NC",
    price: 1600,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
  },
  {
    id: 6,
    title: "Private Room, Shared Home",
    city: "Nashville, TN",
    price: 780,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
  },
]

const PopularProperties = () => {
    return (
        
           <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-slate-900 sm:text-4xl">
          Popular with tenants
        </h2>
        <a href="/properties?sort=rating" 
        className="text-sm font-semibold text-brand-700">
          View all
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((p) => (
          <a key={p.id} href={`/properties/${p.id}`} className="group">
            <div className="overflow-hidden rounded-xl">
             
              <Image
                src={p.image}
                alt={p.title}
                width={500}
                height={44}

                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{p.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" />
                  {p.city}
                </p>
              </div>
              <p className="flex shrink-0 items-center gap-1 text-xs font-medium text-slate-700">
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                {p.rating}
              </p>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              ${p.price.toLocaleString()}
              <span className="font-normal text-slate-500">/month</span>
            </p>
          </a>
        ))}
      </div>
        </div>
    );
};

export default PopularProperties;

