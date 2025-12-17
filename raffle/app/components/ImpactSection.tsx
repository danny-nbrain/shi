'use client'

import Image from 'next/image'

export default function ImpactSection() {
  return (
    <section id="impact" className="pt-24 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Founder Image & Info */}
          <div className="relative">
            {/* Red accent card behind */}
            <div className="absolute -left-4 -top-4 w-full h-full bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:mx-0 bg-gradient-to-br from-slate-800 to-slate-900">
              <Image
                src="/david-photo.jpg.png"
                alt="David Kozlowski"
                fill
                className="object-cover"
              />
              {/* Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6">
                <h3 className="text-white font-bold text-xl">David Kozlowski</h3>
                <p className="text-teal-400 text-sm font-medium">Founder, Social Health Initiative</p>
              </div>
            </div>
          </div>

          {/* Right: Quote & Content */}
          <div className="lg:pl-8">
            {/* Quote Icon */}
            <div className="mb-6">
              <svg className="w-12 h-12 text-teal-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Let me tell you something straight:
            </h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-600 mb-8">
              When people learn how to connect, everything changes.
            </h2>

            <div className="space-y-6 text-gray-600">
              <p className="leading-relaxed">
                &ldquo;For years I watched teens, families, and entire communities struggle — not because they were broken, but because they were disconnected. Once we started teaching Social Health, the shift was immediate. Kids opened up. Families talked again.&rdquo;
              </p>

              <p className="leading-relaxed">
                &ldquo;At Herriman High, when we brought Social Health school-wide, we saw a <span className="font-semibold text-slate-800">30% drop in at-risk behavior</span> in just six months. That wasn&apos;t luck. That was connection doing what connection always does — <span className="italic">it heals, it strengthens, it restores</span>.&rdquo;
              </p>

              <p className="leading-relaxed">
                &ldquo;I&apos;ve seen thousands of students walk into groups anxious, lonely, or shut down, and walk out with a sense of belonging they didn&apos;t know they were missing.&rdquo;
              </p>

              <p className="leading-relaxed font-medium text-slate-800">
                &ldquo;We&apos;re not fixing symptoms. We&apos;re rebuilding relationships. We&apos;re changing culture from the inside out.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


