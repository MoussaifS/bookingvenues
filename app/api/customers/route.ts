import { NextResponse } from 'next/server'

// Use 127.0.0.1 instead of localhost to avoid IPv6 issues
const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_API_URL || '').replace('localhost', '127.0.0.1')
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

if (!STRAPI_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    console.log('Attempting to connect to:', STRAPI_URL) // Debug log

    const response = await fetch(`${STRAPI_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: userData
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Failed to create customer')
    }

    const data = await response.json()
    return NextResponse.json({ 
      success: true, 
      userId: data.data.id 
    })

  } catch (error: any) {
    console.error('Customer creation error:', error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}