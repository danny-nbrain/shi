'use client'

interface HeroProps {
  onEarnFreeTicket: () => void
}

export default function Hero({ onEarnFreeTicket }: HeroProps) {
  return (
    <section className="relative pt-16 pb-32 overflow-hidden">
      {/* Background Image - using CSS background for better control */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/photo-1529156069898-49953e39b3ac.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 1,
          zIndex: 0,
        }}
      />
      {/* Gradient overlay - lighter to show more of the image */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.95) 70%, rgba(255, 255, 255, 1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-28" style={{ zIndex: 10, maxWidth: '1280px', margin: '0 auto' }}>
        <div className="text-center" style={{ maxWidth: '950px', margin: '0 auto' }}>
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: '#0f766e' }}
          >
            <span className="relative flex" style={{ height: '8px', width: '8px' }}>
              <span 
                className="animate-ping absolute inline-flex rounded-full opacity-75"
                style={{ height: '100%', width: '100%', backgroundColor: '#2dd4bf' }}
              />
              <span 
                className="relative inline-flex rounded-full"
                style={{ height: '8px', width: '8px', backgroundColor: '#14b8a6' }}
              />
            </span>
            SHI Christmas Countdown Raffle
          </div>

          {/* Headline */}
          <h1 
            className="font-extrabold mb-8"
            style={{ 
              fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', 
              lineHeight: '1.2',
              color: '#1e293b',
              letterSpacing: '-0.02em',
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            <span style={{ color: '#1e293b' }}>Win Prizes. </span>
            <span style={{ color: '#14b8a6' }}>Build Connection.</span>
            <br />
            <span style={{ color: '#64748b' }}>Strengthen Utah Schools.</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="mb-12 mx-auto"
            style={{ 
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              color: '#475569',
              maxWidth: '750px',
              lineHeight: '1.75',
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            Kids today are surrounded by people, yet many feel alone. Every ticket funds Social Health education to teach real-world connection skills.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#tickets"
              className="inline-flex items-center justify-center gap-2 font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: '#14b8a6',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3)',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0d9488'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
            >
              Get Tickets
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              onClick={onEarnFreeTicket}
              className="inline-flex items-center justify-center gap-2 font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: 'white',
                color: '#1e293b',
                padding: '1rem 2.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #e2e8f0',
              }}
            >
              Earn Free Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative px-4 sm:px-6" style={{ zIndex: 10, maxWidth: '1150px', margin: '-4rem auto 0' }}>
        <div 
          className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
          style={{
            backgroundColor: 'white',
            borderRadius: '1.25rem',
            boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.2)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div className="p-8 text-center" style={{ borderColor: '#f1f5f9' }}>
            <div 
              className="flex items-center justify-center mx-auto mb-3"
              style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}
            >
              <svg className="w-6 h-6" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" strokeWidth="2" />
                <line x1="16" x2="16" y1="2" y2="6" strokeWidth="2" />
                <line x1="8" x2="8" y1="2" y2="6" strokeWidth="2" />
                <line x1="3" x2="21" y1="10" y2="10" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: '#1e293b' }}>Bi-Weekly Drawings</h3>
            <p className="text-sm" style={{ color: '#6b7280' }}>Dec 1 • Dec 15 • Dec 22 • Dec 29</p>
          </div>
          <div className="p-8 text-center" style={{ borderColor: '#f1f5f9' }}>
            <div 
              className="flex items-center justify-center mx-auto mb-3"
              style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}
            >
              <svg className="w-6 h-6" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: '#1e293b' }}>Tickets Re-Enter</h3>
            <p className="text-sm" style={{ color: '#6b7280' }}>One ticket stays in the pot for ALL drawings.</p>
          </div>
          <div className="p-8 text-center" style={{ borderColor: '#f1f5f9' }}>
            <div 
              className="flex items-center justify-center mx-auto mb-3"
              style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '0.75rem' }}
            >
              <svg className="w-6 h-6" style={{ color: '#334155' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold mb-1" style={{ color: '#1e293b' }}>100% Impact</h3>
            <p className="text-sm" style={{ color: '#6b7280' }}>Funds student & teacher training in Utah.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
