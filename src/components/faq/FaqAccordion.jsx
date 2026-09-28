"use client";

import { useState } from "react";
import { faqCategories } from "../../data/faq/faq-data";
import AccordionItemCard from "./card/AccordionItemCard";


const FaqAccordion = () => {
    
    const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);
    const [openKey, setOpenKey] = useState(0);

    const current = faqCategories.find((c) => c.category === activeCategory);

    return (
        <section className="bg-white">
            <div className="mx-auto max-w-4xl px-6 pb-20">
                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6">
                    {faqCategories.map((cat) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveCategory(cat.category)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === cat.category
                                    ? "bg-brand-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>

                {/* accordion list */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6">
                   {
                    current.items.map((item,i)=>
                    <AccordionItemCard
                     key={i} 
                     item={item} 
                     isOpen={openKey === i}
                     onToggle={()=> setOpenKey(openKey === i ? null : i)} />

                   )}
                </div> 
            </div>
        </section>
    );
}

export default FaqAccordion