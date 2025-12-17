import { NextResponse } from 'next/server'
import { getAdminFromCookies } from '@/lib/auth'

export async function GET() {
  try {
    const admin = await getAdminFromCookies()
    
    if (!admin) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: admin.id,
        username: admin.username,
      },
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



