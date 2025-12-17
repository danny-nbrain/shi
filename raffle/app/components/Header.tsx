'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-800 flex items-center justify-center">
              <span className="text-slate-800 font-bold text-sm">SHi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#impact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Our Impact
            </a>
            <a href="#featured-prizes" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Prizes
            </a>
            <a href="#transparency" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Transparency
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#tickets"
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Buy Tickets
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <a
                href="#impact"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Our Impact
              </a>
              <a
                href="#featured-prizes"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Prizes
              </a>
              <a
                href="#transparency"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Transparency
              </a>
              <a
                href="#tickets"
                className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Buy Tickets
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


