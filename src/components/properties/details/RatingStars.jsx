import { Star } from 'lucide-react';
import React from 'react';

const RatingStars = ({rating, size = "size-4"}) => {
  
    const rounded = Math.round(rating);
 
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${
            n <= rounded ? "fill-amber-400 text-amber-400" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStars;