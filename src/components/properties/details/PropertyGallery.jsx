import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const PropertyGallery = ({images , title}) => {


     if (!images || images.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <ImageOff className="size-8" />
      </div>
    );
  }


  const [mainImage, ...restImages] = images;

 const thumbnails = restImages.slice(0, 4);
  const extraCount = images.length - 1 - thumbnails.length;

    return (
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl sm:grid-cols-2 sm:gap-2">
            {/* big photo */}
            <div className="relative h-72 sm:h-full sm:min-h-[320px]">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    priority
                />
            </div>

            {/* ssmall photos */}
            {thumbnails.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                    {thumbnails.map((image, index) => {
                        const isLast = index === thumbnails.length - 1;
                        return (
                            <div key={image} className="relative h-[156px]">
                                <Image
                                    src={image}
                                    alt={`${title} photo ${index + 2}`}
                                    fill
                                    sizes="25vw"
                                    className="object-cover"
                                />
                                {isLast && extraCount > 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                                        +{extraCount} more
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PropertyGallery;