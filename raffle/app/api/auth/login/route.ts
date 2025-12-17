import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyPassword, generateToken, hashPassword } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Find admin user
    let admin = await prisma.admin.findUnique({
      where: { username },
    })

    // If no admin exists, create default admin from env
    if (!admin && username === process.env.ADMIN_USERNAME) {
      const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD || 'admin123')
      admin = await prisma.admin.create({
        data: {
          username: process.env.ADMIN_USERNAME || 'admin',
          password: hashedPassword,
        },
      })
    }

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.password)
    if (!isValid) {
      // Check if this is the env password (for first-time setup)
      if (password === process.env.ADMIN_PASSWORD) {
        // Update the password hash
        const hashedPassword = await hashPassword(password)
        await prisma.admin.update({
          where: { id: admin.id },
          data: { password: hashedPassword },
        })
      } else {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    // Generate JWT token
    const token = generateToken({ id: admin.id, username: admin.username })

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        username: admin.username,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



