import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Get in Touch</h1>
      <p className="text-muted mb-10">
        We'd love to hear from you. Reach out with any questions.
      </p>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <form
          className="bg-surface border border-stroke rounded-3xl p-6 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <input
            placeholder="Subject"
            className="w-full bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-bg border border-stroke rounded-xl px-4 py-3 text-sm outline-none focus:border-accent resize-none"
          />
          <button className="inline-flex items-center gap-2 bg-text-primary text-bg px-6 py-3 rounded-full text-sm hover:bg-accent transition-colors">
            <Send size={16} /> Send Message
          </button>
        </form>
        <aside className="space-y-4">
          {[Mail, Phone, MapPin].map((I, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-surface border border-stroke rounded-2xl p-5"
            >
              <div className="w-11 h-11 grid place-items-center rounded-full bg-accent/15 text-accent">
                <I size={18} />
              </div>
              <div>
                <p className="text-xs text-muted">
                  {["Email", "Phone", "Location"][i]}
                </p>
                <p className="text-sm">
                  {["hello@nova.com", "+91 90000 00000", "Mumbai, India"][i]}
                </p>
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            {["Twitter", "Instagram", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor
                className="flex-1 text-center border border-stroke rounded-xl py-3 text-sm text-muted hover:text-text-primary hover:border-accent transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
