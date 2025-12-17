'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-sm">SHi</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left max-w-md">
              Social Health Initiative is a registered nonprofit. This raffle is conducted in accordance with Utah state laws.
            </p>
          </div>

          {/* Right: Links */}
          <div className="flex gap-6">
            <Link href="/rules" className="text-gray-400 hover:text-white transition-colors text-sm">
              Official Rules
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Social Health Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}



