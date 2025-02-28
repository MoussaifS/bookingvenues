export interface Venue {
  id: number;
  documentId: string;
  pricePerHour: number;
  description: string;
  name: string | null;
  capacity: number | null;
  setupOptions: string[] | null;
  amenities: string[] | null;
  rules: string[] | null;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface VenueResponse {
  data: Venue[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}