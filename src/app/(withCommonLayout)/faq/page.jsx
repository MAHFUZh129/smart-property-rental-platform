import FaqAccordion from '@/components/faq/FaqAccordion';
import FaqCTA from '@/components/faq/FaqCTA';
import FaqHero from '@/components/faq/FaqHero';
import React from 'react';

const page = () => {
    return (
        <div>
            <main>
                <FaqHero />
                <FaqAccordion />
                <FaqCTA />
            </main>
        </div>
    );
};

export default page;