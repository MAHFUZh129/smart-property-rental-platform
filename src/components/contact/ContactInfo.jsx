import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@rentora.com",
    href: "mailto:support@rentora.app",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1751847556",
    href: "tel:+88018687527648",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "House 12, Road 5, Dhanmondi, Dhaka",
    href: null,
  },
];

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h3 className="font-[family-name:var(--font-display)] text-lg text-slate-900">
          Other ways to reach us
        </h3>
        <ul className="mt-5 space-y-5">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs text-slate-400">{label}</p>
                {href ? (
                  <Link
                    href={href}
                    className="text-[15px] text-slate-900 hover:text-brand-600"
                  >
                    {value}
                  </Link>
                ) : (
                  <p className="text-[15px] text-slate-900">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-brand-600 p-6 text-white sm:p-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
          <Clock className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg">
          Response time
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-50">
          We reply to most messages within one business day. For urgent
          maintenance issues, use the{" "}
          <span className="font-medium">maintenance request</span> tool in
          your tenant dashboard instead — it reaches your landlord directly.
        </p>
      </div>

      <p className="text-sm text-slate-500">
        Looking for a quick answer instead?{" "}
        <Link href="/faq" className="font-medium text-brand-600 hover:text-brand-700">
          Check the FAQ
        </Link>
        .
      </p>
    </div>
  );
}

export default ContactInfo;