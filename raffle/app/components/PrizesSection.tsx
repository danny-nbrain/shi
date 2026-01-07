'use client'

import Image from 'next/image'

export default function PrizesSection() {
  return (
    <section id="featured-prizes" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-500/10 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3 border border-teal-500/20">
            First Giveaway
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 leading-tight">
            Win Custom Kicks by <span className="text-teal-600">JSM801</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            We are kicking things off with incredible craftsmanship. Win a pair of reconstructed custom Nikes by{' '}
            <a href="https://www.jsm801.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">
              JSM801
            </a>
            .
          </p>
        </div>

        {/* Prize Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Prize 1 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all group">
            <div className="relative aspect-[4/3] bg-slate-700 p-6">
              <Image
                src="/prize-1.jpg.jpeg"
                alt="Custom Jordan 1 Low Blue/White"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-white mb-1">Custom Jordan 1 Low</h3>
              <p className="text-gray-400 text-sm mb-4">Off-White Inspired • Reconstructed</p>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Crafted by JSM801.com
              </div>
            </div>
          </div>

          {/* Prize 2 */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all group">
            <div className="relative aspect-[4/3] bg-slate-700 p-6">
              <Image
                src="/prize-2.jpg.jpeg"
                alt="Custom Jordan 1 Low Union Style"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-white mb-1">Custom Jordan 1 Low</h3>
              <p className="text-gray-400 text-sm mb-4">Union LA Inspired • Reconstructed</p>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Crafted by JSM801.com
              </div>
            </div>
          </div>
        </div>

        {/* Link to JSM801 */}
        <div className="text-center mt-8">
          <a
            href="https://www.jsm801.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            View more custom work at JSM801.com
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}


