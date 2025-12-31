'use client'

interface HeroProps {
  onEarnFreeTicket: () => void
}

export default function Hero({ onEarnFreeTicket }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/photo-1529156069898-49953e39b3ac.jpeg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-900/10 to-white"
      />

      {/* Content */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 pb-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
            </span>
            SHI Christmas Countdown Raffle
          </div>

          {/* Headline */}
          <h1 className="mx-auto mt-7 max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="text-white">Win Prizes. </span>
            <span className="text-teal-400">Build Connection.</span>
            <br className="hidden sm:block" />
            <span className="text-white/90">Strengthen Utah Schools.</span>
          </h1>

          {/* Subheadline */}
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-white/40 bg-white/75 px-6 py-4 text-pretty text-base font-medium leading-relaxed text-slate-900 shadow-lg backdrop-blur sm:text-lg">
            Kids today are surrounded by people, yet many feel alone. Every ticket funds Social Health education to teach real-world connection skills.
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#tickets"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-10 py-4 text-lg font-semibold text-slate-900 shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 hover:bg-teal-400 hover:shadow-xl"
            >
              Get Tickets
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onEarnFreeTicket}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/55 bg-white/20 px-10 py-4 text-lg font-semibold text-white shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25 hover:shadow-lg"
            >
              Earn Free Ticket
            </button>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-14">
          <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur md:grid-cols-3 md:divide-x md:divide-y-0 divide-y divide-gray-100">
            <div className="p-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" strokeWidth="2" />
                  <line x1="16" x2="16" y1="2" y2="6" strokeWidth="2" />
                  <line x1="8" x2="8" y1="2" y2="6" strokeWidth="2" />
                  <line x1="3" x2="21" y1="10" y2="10" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">Bi-Weekly Drawings</h3>
              <p className="mt-1 text-sm text-slate-500">Jan 15 • Feb 1 • Feb 15 • Mar 1 • Mar 15</p>
            </div>
            <div className="p-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">Tickets Re-Enter</h3>
              <p className="mt-1 text-sm text-slate-500">One ticket stays in the pot for ALL drawings.</p>
            </div>
            <div className="p-7 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">100% Impact</h3>
              <p className="mt-1 text-sm text-slate-500">Funds student & teacher training in Utah.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
