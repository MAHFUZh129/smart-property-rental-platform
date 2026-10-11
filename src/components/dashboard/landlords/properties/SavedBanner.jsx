import { CheckCircle2 } from 'lucide-react';
import React from 'react';

const MESSAGES = {
  created: "Property submitted! It will go live once an admin approves it.",
  updated: "Changes saved.",
}

const SavedBanner = ({ saved }) => {

    const message = MESSAGES[saved];
    if (!message) return null;

    return (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="size-5 shrink-0" />
            {message}
        </div>
    )
};

export default SavedBanner;