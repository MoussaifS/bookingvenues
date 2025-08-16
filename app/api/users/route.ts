import { NextResponse } from 'next/server'

/*
  STRAPI INTEGRATION (DISABLED)
  Previous code posting to Strapi has been commented out because it's not in use now.
  Retrieve from git history when needed again.

  // const RAW_STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_API_URL || ''
  // const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || ''
  // const STRAPI_URL = RAW_STRAPI_URL.replace('localhost', '127.0.0.1')
*/

export async function POST() {
  return NextResponse.json(
    { success: false, message: 'User creation disabled: Strapi integration not in use.' },
    { status: 501 }
  )
}