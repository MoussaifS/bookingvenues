import { NextResponse } from 'next/server'

/*
  STRAPI INTEGRATION (DISABLED)
  The previous Strapi integration code has been commented out because it's currently unused.
  If you need to restore it, retrieve it from version control history.

  // const RAW_STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || ''
  // const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''
  // const STRAPI_URL = RAW_STRAPI_URL.replace('localhost', '127.0.0.1')
  // export async function POST(request: Request) { ... }
*/

export async function POST() {
  // Placeholder response while Strapi is not used.
  return NextResponse.json(
    {
      success: false,
      message: 'Customer creation disabled: Strapi integration not in use.'
    },
    { status: 501 }
  )
}