"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const topics = [
  "General question",
  "Tenant support",
  "Landlord support",
  "Billing & payments",
  "Report a problem",
];

const ContactForm = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {

    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // TODO: replace with a real call once the API route exists, e.g.
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStatus("sent");
  }

  if (status === "sent") {

    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-slate-900">
          Message sent
        </h3>
        <p className="mt-2 max-w-[36ch] text-sm text-slate-500">
          Thanks, {form.name.split(" ")[0] || "there"}.
          We'll reply to {form.email} within one business day.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", email: "", topic: topics[0], message: "" });
            setStatus("idle");
          }}
          className="mt-6 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Mahfuz Hossain"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="mahfuz.codes@gmail.com"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className="text-sm font-medium text-slate-700">
          What&rsquo;s this about?
        </label>
        <select
          id="topic"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-[15px] text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us a bit about what's going on..."
          className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-[15px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        <Send className="h-4 w-4" strokeWidth={1.75} />
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export default ContactForm;