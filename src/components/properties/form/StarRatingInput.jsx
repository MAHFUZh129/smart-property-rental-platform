
'use client'

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRatingInput = ({ name = "rating" }) => {

    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    return (
        
        <div>
            <input type="hidden" name={name} value={rating} />

            <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                        className="p-0.5"
                    >
                        <Star
                            className={`size-7 transition-colors ${star <= (hovered || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StarRatingInput;