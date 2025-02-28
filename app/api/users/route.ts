import { NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

if (!STRAPI_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined')
}

if (!STRAPI_API_TOKEN) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_TOKEN is not defined')
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    const response = await fetch(`${STRAPI_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phone,
          notes: userData.notes || '',
          publishedAt: new Date().toISOString(),
        }
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Failed to create customer')
    }

    const data = await response.json()
    return NextResponse.json({ 
      success: true, 
      userId: data.data.id 
    })

  } catch (error: any) {
    console.error('User creation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create customer'
      },
      { status: 500 }
    )
  }
}