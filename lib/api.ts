// lib/api.ts

import qs from "qs"; // Import qs for population query

// Assume STRAPI_TOKEN is needed for fetching single entries too
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
// const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // Get token

// Helper to get headers (if auth is needed)
// const getAuthHeaders = () => {
//   if (!STRAPI_TOKEN) return {}; // Return empty if no token
//   return {
//     Authorization: `Bearer ${STRAPI_TOKEN}`,
//   };
// };

// Updated fetchAPI to handle options and errors better
export async function fetchAPI(path: string, options: RequestInit = {}) {
  const requestUrl = `${STRAPI_API_URL}/api${path}`;
  const mergedOptions: RequestInit = {
    ...options, // Allow passing method, body, etc.
    headers: {
      'Content-Type': 'application/json', // Default content type
      // ...getAuthHeaders(), // Add auth headers
      ...options.headers, // Allow overriding headers
    },
     // cache: 'no-store', // Uncomment for development if needed
     // next: { revalidate: 60 } // Example: Revalidate every 60 seconds
  };

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(`API Error (${response.status}) for ${path}:`, await response.text());
      throw new Error(`Failed to fetch API: ${response.status} ${response.statusText}`);
    }

    // Handle cases where response might be empty (e.g., DELETE)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null; // Or return { success: true } if appropriate
    }

    const data = await response.json();
    return data; // Usually { data: ..., meta: ... }

  } catch (error) {
    console.error(`Network or processing error for ${path}:`, error);
    // Re-throw or handle as needed
    throw error;
  }
}

// --- VENUE FUNCTIONS ---

// Get all venues (Populates relations)
export async function getAllVenues() {
  // Use qs to create the populate query correctly
  const query = qs.stringify({
     populate: {
       images: true, // Example: Populate images relation directly
       // Add other top-level relations if needed
       // Strapi often includes components/nested objects by default unless explicitly excluded
     },
  }, {
    encodeValuesOnly: true,
  });
  return fetchAPI(`/venues?${query}`);
}

// Get a SINGLE venue by ID (Updated)
// Accepts string ID, adds populate, uses fetchAPI for error handling/auth
export async function getVenue(id: string) {
  if (!id) {
    throw new Error("Venue ID is required.");
  }
  // Use qs for population here too
  const query = qs.stringify({
     populate: {
       images: true, // Populate images relation
       // Make sure setupOptions and amenities are populated if they are components/relations
       // If they are just JSON fields or simple text, they might not need population.
       // Check your Strapi structure. Example if they were relations:
       // setupOptions: { populate: '*' },
       // amenities: { populate: '*' }
     },
  }, {
    encodeValuesOnly: true,
  });

  return fetchAPI(`/venues/${id}?${query}`);
}

// --- BOOKING/POST FUNCTION ---

// POST function using the updated fetchAPI
export async function postAPI(path: string, data: any) {
  return fetchAPI(path, {
    method: 'POST',
    body: JSON.stringify({ data: data }), // Strapi often expects data wrapped in { data: ... }
  });
}


// --- Note: getAllExperiences seems redundant ---
// If it's truly identical to getAllVenues, you can remove it.
// export async function getAllExperiences() { ... }