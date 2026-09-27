"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqCategories } from "./faq-data";

const  AccordionItem = ({ item, isOpen, onToggle }) => {
    return (
        <div className="border-b border-slate-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="text-[15px] font-medium text-slate-900">{item.q}</span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-600" : ""
                        }`}
                    strokeWidth={1.75}
                />
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[65ch] text-sm leading-relaxed text-slate-600">
                        {item.a}
                    </p>
                </div>
            </div>
        </div>
    );

}

const FaqAccordion = () => {

    
    const [activeCategory, setActiveCategory] = useState(faqCategories[0].category);
    const [openKey, setOpenKey] = useState(`${faqCategories[0].category}-0`);

    const current = faqCategories.find((c) => c.category === activeCategory);

    console.log(current)

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

                {/* Accordion list */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6">
                    {current.items.map((item, i) => {
                        const key = `${current.category}-${i}`;
                        return (
                            <AccordionItem 
                                key={key}
                                item={item}
                                isOpen={openKey === key}
                                onToggle={() => setOpenKey(openKey === key ? null : key)}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FaqAccordion