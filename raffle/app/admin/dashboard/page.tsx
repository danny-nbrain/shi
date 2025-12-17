'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  totalEntries: number
  totalTickets: number
  totalRevenue: number
}

interface Entry {
  id: string
  ticketId: string
  name: string
  email: string
  ticketType: string
  ticketCount: number
  purchaseType: string
  amount: number | null
  status: string
  createdAt: string
}

interface Submission {
  id: string
  name: string
  email: string
  taskType: string
  proofUrl: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'entries' | 'submissions' | 'drawings' | 'prizes' | 'settings'>('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check auth
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) {
          router.push('/admin')
        } else {
          fetchData()
        }
      })
      .catch(() => router.push('/admin'))
  }, [router])

  const fetchData = async () => {
    try {
      const [entriesRes, submissionsRes] = await Promise.all([
        fetch('/api/entries'),
        fetch('/api/free-ticket?status=pending'),
      ])

      if (entriesRes.ok) {
        const data = await entriesRes.json()
        setEntries(data.entries || [])
        setStats(data.stats || null)
      }

      if (submissionsRes.ok) {
        const data = await submissionsRes.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleApproveSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/free-ticket/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      })

      if (res.ok) {
        setSubmissions(submissions.filter(s => s.id !== id))
        fetchData() // Refresh stats
      }
    } catch (error) {
      console.error('Error approving submission:', error)
    }
  }

  const handleRejectSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/free-ticket/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject' }),
      })

      if (res.ok) {
        setSubmissions(submissions.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('Error rejecting submission:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-800 text-white p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-teal-500 flex items-center justify-center">
            <span className="text-teal-500 font-bold text-sm">SHi</span>
          </div>
          <div>
            <h1 className="font-bold">SHI Raffle</h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'entries', label: 'Entries', icon: '🎫' },
            { id: 'submissions', label: 'Free Tickets', icon: '📝', badge: submissions.length },
            { id: 'drawings', label: 'Drawings', icon: '🎡' },
            { id: 'prizes', label: 'Prizes', icon: '🎁' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Link
            href="/"
            className="block text-center text-gray-400 hover:text-white py-2 mb-2 transition-colors"
          >
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center text-red-400 hover:text-red-300 py-2 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Total Entries</p>
                <p className="text-3xl font-bold text-slate-800">{stats?.totalEntries || 0}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Total Tickets</p>
                <p className="text-3xl font-bold text-slate-800">{stats?.totalTickets || 0}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-teal-600">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-500 text-sm mb-1">Pending Reviews</p>
                <p className="text-3xl font-bold text-orange-500">{submissions.length}</p>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-slate-800">Recent Entries</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entries.slice(0, 10).map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-teal-600">{entry.ticketId}</td>
                        <td className="px-6 py-4 text-slate-800">{entry.name}</td>
                        <td className="px-6 py-4 text-slate-600">{entry.ticketCount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            entry.purchaseType === 'paid' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {entry.purchaseType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {entry.amount ? `$${entry.amount.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No entries yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entries' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">All Entries</h2>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm text-teal-600">{entry.ticketId}</td>
                        <td className="px-6 py-4 text-slate-800">{entry.name}</td>
                        <td className="px-6 py-4 text-slate-600">{entry.email}</td>
                        <td className="px-6 py-4 text-slate-600">{entry.ticketCount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            entry.purchaseType === 'paid' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {entry.purchaseType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            entry.status === 'active' 
                              ? 'bg-green-100 text-green-700'
                              : entry.status === 'winner'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {entries.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No entries yet
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Free Ticket Submissions</h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{submission.name}</h3>
                      <p className="text-gray-500 text-sm">{submission.email}</p>
                      <p className="text-teal-600 text-sm mt-1">
                        Task: {submission.taskType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-gray-400 text-xs mt-2">
                        Submitted: {new Date(submission.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={submission.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                      >
                        View Proof
                      </a>
                      <button
                        onClick={() => handleApproveSubmission(submission.id)}
                        className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectSubmission(submission.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {submissions.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
                  No pending submissions
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'drawings' && (
          <DrawingsTab />
        )}

        {activeTab === 'prizes' && (
          <PrizesTab />
        )}

        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </main>
    </div>
  )
}

function DrawingsTab() {
  const [drawings, setDrawings] = useState<{ id: string; date: string; status: string; winnerName?: string }[]>([])
  const [spinning, setSpinning] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/drawings')
      .then(res => res.json())
      .then(data => setDrawings(data))
      .catch(console.error)
  }, [])

  const handleSpin = async (drawingId: string) => {
    setSpinning(drawingId)
    try {
      const res = await fetch(`/api/drawings/${drawingId}/spin`, {
        method: 'POST',
      })
      const data = await res.json()
      if (data.success) {
        alert(`🎉 Winner: ${data.winner.name} (${data.winner.ticketId})`)
        // Refresh drawings
        fetch('/api/drawings')
          .then(res => res.json())
          .then(data => setDrawings(data))
      } else {
        alert(data.error || 'Failed to spin')
      }
    } catch (error) {
      console.error('Error spinning:', error)
    } finally {
      setSpinning(null)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Drawing Management</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { date: 'Dec 1', fullDate: '2024-12-01' },
          { date: 'Dec 15', fullDate: '2024-12-15' },
          { date: 'Dec 22', fullDate: '2024-12-22' },
          { date: 'Dec 29', fullDate: '2024-12-29' },
        ].map((d) => {
          const drawing = drawings.find(dr => dr.date === d.date)
          return (
            <div key={d.date} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-xl text-slate-800 mb-2">{d.date}</h3>
              <p className={`text-sm mb-4 ${
                drawing?.status === 'completed' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {drawing?.status === 'completed' ? `Winner: ${drawing.winnerName}` : 'Pending'}
              </p>
              <button
                onClick={() => drawing ? handleSpin(drawing.id) : null}
                disabled={drawing?.status === 'completed' || spinning === drawing?.id}
                className="w-full py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
              >
                {spinning === drawing?.id ? 'Spinning...' : drawing?.status === 'completed' ? 'Completed' : 'Spin Wheel'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PrizesTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Prize Management</h2>
        <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
          Add Prize
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-500 text-center py-8">
          Prize management interface coming soon. Current prizes are displayed on the home page.
        </p>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-slate-800 mb-4">Site Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Title
              </label>
              <input
                type="text"
                defaultValue="Win Prizes. Build Connection. Strengthen Utah Schools."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hero Subtitle
              </label>
              <textarea
                defaultValue="Kids today are surrounded by people, yet many feel alone. Every ticket funds Social Health education to teach real-world connection skills."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="font-semibold text-slate-800 mb-4">Stripe Settings</h3>
          <p className="text-gray-500 text-sm mb-4">
            Stripe is configured via environment variables. Update your .env file to change Stripe settings.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-600">
            STRIPE_PUBLISHABLE_KEY=pk_live_...
            <br />
            STRIPE_SECRET_KEY=sk_live_...
          </div>
        </div>

        <div className="pt-6 border-t">
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}



