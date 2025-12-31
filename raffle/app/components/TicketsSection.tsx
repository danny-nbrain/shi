'use client'

import { useState } from 'react'

interface TicketPackage {
  id: string
  name: string
  tickets: number
  price: number
  pricePerEntry: number
  stripeLink: string
  popular?: boolean
  subtitle: string
}

const TICKET_PACKAGES: TicketPackage[] = [
  {
    id: 'starter',
    name: '1 Ticket',
    subtitle: 'Starter',
    tickets: 1,
    price: 5,
    pricePerEntry: 5.00,
    stripeLink: 'https://buy.stripe.com/dRmcN44dM7nuaoA2uJ4sE00',
  },
  {
    id: 'supporter',
    name: '5 Tickets',
    subtitle: 'Supporter',
    tickets: 5,
    price: 20,
    pricePerEntry: 4.00,
    stripeLink: 'https://buy.stripe.com/aFafZg9y65fmdAM3yN4sE01',
  },
  {
    id: 'community_builder',
    name: '25 Tickets',
    subtitle: 'Community Builder',
    tickets: 25,
    price: 75,
    pricePerEntry: 3.00,
    // Verified: $75 "Social Health Community Builder Ticket" (25 tickets)
    stripeLink: 'https://buy.stripe.com/cNiaEWcKi5fm68k4CR4sE02',
  },
  {
    id: 'school_champion',
    name: '100 Tickets',
    subtitle: 'School Champion',
    tickets: 100,
    price: 200,
    pricePerEntry: 2.00,
    // Verified: $200 "Social Health School Champion Ticket" (100 tickets)
    stripeLink: 'https://buy.stripe.com/6oUaEW5hQbDK40c4CR4sE03',
  },
]

interface TicketsSectionProps {
  showFreeTicket?: boolean
  onEarnFreeTicket?: () => void
}

export default function TicketsSection({ showFreeTicket = true, onEarnFreeTicket }: TicketsSectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('community_builder')

  const selected = TICKET_PACKAGES.find(p => p.id === selectedPackage)
  const canCheckout = Boolean(selected?.stripeLink)

  const handleCheckout = () => {
    if (selected?.stripeLink) {
      window.open(selected.stripeLink, '_blank')
    }
  }

  return (
    <section id="tickets" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Purchase Tickets */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-800">Purchase Tickets</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 ml-11">
              Select a package below. The more you buy, the more connection you fund.
            </p>

            {/* Ticket Options */}
            <div className="space-y-3">
              {TICKET_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left relative hover:shadow-md ${
                    selectedPackage === pkg.id
                      ? 'border-teal-500 bg-teal-50/50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${pkg.popular ? 'pt-8' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-teal-500 text-white text-[10px] font-bold tracking-wider text-center py-1 rounded-t-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage === pkg.id ? 'border-teal-500' : 'border-gray-300'
                      }`}>
                        {selectedPackage === pkg.id && (
                          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{pkg.name}</div>
                        <div className="text-sm text-gray-500">{pkg.subtitle}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">${pkg.price}</div>
                      <div className="text-xs text-gray-500">${pkg.pricePerEntry.toFixed(2)}/entry</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="mt-8">
              <button
                onClick={handleCheckout}
                disabled={!canCheckout}
                data-stripe-link={selected?.stripeLink || ''}
                className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                </svg>
                {canCheckout ? `Checkout - $${selected?.price} Donation` : 'Checkout Unavailable'}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Secure checkout via Stripe/PayPal. Receipts sent automatically.
              </p>
            </div>
          </div>

          {/* Right: Free Ticket Section */}
          {showFreeTicket && (
            <FreeTicketSection onSubmit={onEarnFreeTicket} />
          )}
        </div>
      </div>
    </section>
  )
}

interface FreeTicketSectionProps {
  onSubmit?: () => void
}

function FreeTicketSection({ onSubmit }: FreeTicketSectionProps) {
  const [selectedTask, setSelectedTask] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const tasks = [
    {
      id: 'lunch_invite',
      name: 'The Lunch Invite',
      description: 'Invite someone new to sit with you at lunch, practice, or break.',
    },
    {
      id: 'active_listening',
      name: 'Active Listening',
      description: 'Ask someone how they are doing and listen for 2 minutes without interrupting.',
    },
    {
      id: 'gratitude_note',
      name: 'Gratitude Note',
      description: 'Write a handwritten thank-you message to someone who helped you this year.',
    },
    {
      id: 'device_free_dinner',
      name: 'Device-Free Dinner',
      description: 'Eat one meal with your phone in another room.',
    },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!selectedTask || !file || !email || !name) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('taskType', selectedTask)
      formData.append('email', email)
      formData.append('name', name)

      const response = await fetch('/api/free-ticket', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitted(true)
        onSubmit?.()
      }
    } catch (error) {
      console.error('Error submitting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Task Submitted!</h3>
          <p className="text-gray-600">
            We&apos;ll review your submission and email you once your free ticket is confirmed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
          2
        </div>
        <h2 className="text-xl font-bold text-slate-800">Earn a Free Ticket</h2>
      </div>
      <p className="text-gray-600 text-sm mb-6 ml-11">
        No purchase necessary. Complete a weekly Connection Task to earn an entry. Connection is a skill—practice it to win.
      </p>

      {/* Task Selection */}
      <h3 className="font-semibold text-slate-800 mb-3">Choose This Week&apos;s Task:</h3>
      <div className="space-y-2 mb-6">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelectedTask(task.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
              selectedTask === task.id
                ? 'border-teal-500 bg-teal-50/50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                selectedTask === task.id ? 'border-teal-500' : 'border-gray-300'
              }`}>
                {selectedTask === task.id && (
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full" />
                )}
              </div>
              <div>
                <div className="font-semibold text-slate-800">{task.name}</div>
                <div className="text-sm text-gray-500">{task.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Contact Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Proof</label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-medium">{file.name}</span>
            </div>
          ) : (
            <>
              <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-1">Click to upload photo or video</p>
              <p className="text-sm text-gray-400">JPG, PNG, MP4 up to 10MB</p>
            </>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedTask || !file || !email || !name || isSubmitting}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Task & Claim Ticket'
        )}
      </button>
    </div>
  )
}


