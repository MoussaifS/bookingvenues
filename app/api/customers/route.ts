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

    const responseData = await response.json()
    return NextResponse.json({ 
      success: true, 
      userId: responseData.data.id 
    })

  } catch (error: Error | unknown) { // Use Error | unknown instead of any
    console.error('Customer creation error:', error)
    // Check if it's an Error instance before accessing message
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, message: message },
      { status: 500 }
    )
  }
}