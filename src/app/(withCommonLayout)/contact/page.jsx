import ContactForm from '@/components/contact/ContactForm';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import React from 'react';

const page = () => {
    return (
        <div>
            <main className="bg-white">
                <ContactHero />
                <section className="mx-auto max-w-6xl px-6 pb-20">
                    <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                        <ContactForm />
                        <ContactInfo />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default page;