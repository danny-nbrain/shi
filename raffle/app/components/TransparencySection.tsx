'use client'

const drawings = [
  { date: 'Jan 15', status: 'Next Drawing' },
  { date: 'Feb 1', status: 'Upcoming' },
  { date: 'Feb 15', status: 'Upcoming' },
  { date: 'Mar 1', status: 'Upcoming' },
  { date: 'Mar 15', status: 'Upcoming' },
]

export default function TransparencySection() {
  return (
    <section id="transparency" className="py-20 bg-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {/* Lock Icon */}
          <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-3.5 leading-tight">
            Fair. Transparent. Secure.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            We use a verifiable &ldquo;Wheel of Names&rdquo; system for every drawing. Each entry is assigned a unique Ticket ID to protect your privacy while ensuring every ticket is counted.
          </p>
        </div>

        {/* Drawing Dates */}
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {drawings.map((drawing, index) => (
            <div
              key={drawing.date}
              className={`px-8 py-4 rounded-xl text-center min-w-[140px] ${
                index === 0
                  ? 'bg-slate-700 border-2 border-teal-500'
                  : 'bg-slate-700/50 border-2 border-transparent'
              }`}
            >
              <div className="font-bold text-lg">{drawing.date}</div>
              <div className={`text-sm ${index === 0 ? 'text-teal-400' : 'text-gray-400'}`}>
                {drawing.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



