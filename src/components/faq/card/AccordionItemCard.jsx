import { ChevronDown } from 'lucide-react';
import React from 'react';

const AccordionItemCard = ({ item, isOpen, onToggle }) => {
    
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
};

export default AccordionItemCard;