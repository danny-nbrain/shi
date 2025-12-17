'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [ticketId, setTicketId] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get session_id from URL if coming from Stripe
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Verify the session and get ticket info
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.ticketId) {
            setTicketId(data.ticketId)
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Thank You! 🎉
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your donation has been received and your tickets are in the draw!
        </p>

        {loading ? (
          <div className="animate-pulse bg-gray-200 rounded-xl p-6 mb-8">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ) : ticketId ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <p className="text-gray-600 mb-2">Your Ticket ID</p>
            <p className="text-3xl font-mono font-bold text-teal-600">{ticketId}</p>
            <p className="text-sm text-gray-500 mt-2">Save this for the drawing!</p>
          </div>
        ) : null}

        <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-slate-800 mb-3">What happens next?</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>You&apos;ll receive a confirmation email with your ticket details</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Your tickets are automatically entered into ALL upcoming drawings</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Winners will be notified via email and announced on our site</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <a
            href="https://twitter.com/intent/tweet?text=I%20just%20entered%20the%20SHI%20Christmas%20Countdown%20Raffle%20to%20win%20amazing%20prizes%20while%20supporting%20Social%20Health%20education%20in%20Utah%20schools!%20%F0%9F%8E%89&url=https://raffle.socialhealthinitiative.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </a>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          100% of your donation goes to Social Health education in Utah schools.
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}



