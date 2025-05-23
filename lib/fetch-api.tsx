import qs from 'qs'
import { getStrapiURL } from './api-helpers'

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param path Path of the API route
 * @param urlParamsObject URL params object, will be stringified
 * @param options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occurred please try again`)
  }
  const data = await response.json()
  return data
}