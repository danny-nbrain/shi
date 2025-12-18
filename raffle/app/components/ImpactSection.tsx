'use client'

import Image from 'next/image'

export default function ImpactSection() {
  return (
    <section id="impact" className="bg-gray-50 pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-xl sm:p-10">
          <div className="grid items-center gap-12 lg:grid-cols-[360px_1fr]">
            {/* Left: Founder Image & Info */}
            <div className="relative">
              {/* Subtle accent behind */}
              <div className="absolute -left-6 -top-6 h-full w-full rotate-2 rounded-3xl bg-gradient-to-br from-teal-500 to-slate-900 opacity-10" />
              <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl lg:mx-0">
                <Image src="/david-photo.jpg.png" alt="David Kozlowski" fill className="object-cover" />
                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">David Kozlowski</h3>
                  <p className="text-sm font-medium text-teal-300">Founder, Social Health Initiative</p>
                </div>
              </div>
            </div>

            {/* Right: Quote & Content */}
            <div>
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className="h-10 w-10 text-teal-500/15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              <h2 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                Let me tell you something straight:
              </h2>
              <h2 className="mt-1.5 text-xl font-bold leading-tight text-teal-600 sm:text-2xl">
                When people learn how to connect, everything changes.
              </h2>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
                <p>
                  &ldquo;For years I watched teens, families, and entire communities struggle — not because they were broken, but because they were disconnected. Once we started teaching Social Health, the shift was immediate. Kids opened up. Families talked again.&rdquo;
                </p>

                <p>
                  &ldquo;At Herriman High, when we brought Social Health school-wide, we saw a{' '}
                  <span className="font-semibold text-slate-900">30% drop in at-risk behavior</span> in just six months. That wasn&apos;t luck. That was connection doing what connection always does —{' '}
                  <span className="italic">it heals, it strengthens, it restores</span>.&rdquo;
                </p>

                <p>
                  &ldquo;I&apos;ve seen thousands of students walk into groups anxious, lonely, or shut down, and walk out with a sense of belonging they didn&apos;t know they were missing.&rdquo;
                </p>

                <p className="font-medium text-slate-900">
                  &ldquo;We&apos;re not fixing symptoms. We&apos;re rebuilding relationships. We&apos;re changing culture from the inside out.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


