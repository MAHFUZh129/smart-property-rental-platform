import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import Story from '@/components/about/Story';
import WhoItsFor from '@/components/about/WhoItsFor';
import Stats from '@/components/about/Stats';
import AboutCTA from '@/components/about/AboutCTA';



export const metadata = {
    title: "About",
    description:
        "Rentora brings property discovery, rentals, payments, maintenance, and reviews into one platform for tenants, landlords, and admins.",
};

const Services = () => {
    return (
        <div>

            <main>
                <AboutHero />
                <Story/>
                <WhoItsFor />
                <Stats />
                <AboutCTA />
            </main>

        </div>
    );
};

export default Services;