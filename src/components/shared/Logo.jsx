import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <Image src="/image.png" alt="Nestly Logo" width={140} height={60} priority />
        </div>
    );
};

export default Logo;