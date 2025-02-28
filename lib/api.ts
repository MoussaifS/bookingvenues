const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function fetchAPI(path: string) {
  const requestUrl = `${STRAPI_API_URL}/api${path}`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

// Update the API functions
export async function getAllVenues() {
  return fetchAPI('/venues');
}

export async function getVenue(id: number) {
  return fetchAPI(`/venues/${id}`);
}

export async function postAPI(path: string, data: any) {
  const requestUrl = `${STRAPI_API_URL}/api${path}`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}