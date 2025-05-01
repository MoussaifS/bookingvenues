// Ensure this file is placed correctly in your project, e.g., app/select-experience/page.tsx or similar

'use client' // Necessary for client-side interactions like Link clicks

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path if needed
import { ArrowRight } from "lucide-react";

// --- Mock Data (Unchanged) ---
const mockVenueData = [
    {
        "id": 10,
        "documentId": "rn3uij5x3ee3mxldladrisu7",
        "name": "Executive Meeting Room B",
        "description": "Modern, well-lit conference room with seating for 10...",
        "capacity": 20,
        "pricePerHour": 75,
        "setupOptions": { /* Omitted for brevity */ },
        "amenities": { /* Omitted for brevity */ },
        "rules": "- Minimum booking: 1 hour\n- 24-hour cancellation policy...",
        "slug": "executive-meeting-room-b",
        "cardTitle": "Executive Meeting Room B",
        "cardDescription": "Bright, modern meeting room for up to 10 guests. Includes smart TV, whiteboard, flipchart, and fast Wi-Fi—ideal for team sessions and presentations.",
        "cardFeatures": "Video conferencing | Projector | Catering Available",
        "spaceType": "meeting room",
        "createdAt": "2025-04-30T11:29:27.106Z",
        "updatedAt": "2025-04-30T11:34:10.565Z",
        "publishedAt": "2025-04-30T11:34:10.580Z"
    },
    {
        "id": 12,
        "documentId": "vbjloesj4wtsklknq7mmv1ej",
        "name": "Executive Meeting Room A",
        "description": "Stylish lounge space with plush seating...",
        "capacity": 12,
        "pricePerHour": 75,
        "setupOptions": { /* Omitted for brevity */ },
        "amenities": { /* Omitted for brevity */ },
        "rules": "- Minimum booking: 1 hour\n- 24-hour cancellation policy...",
        "slug": "executive-meeting-room-a",
        "cardTitle": "Executive Meeting Room", // Use this for filename
        "cardDescription": "Stylish lounge space with plush seating, ideal for casual meetings or relaxed breakout sessions. Includes bottled water, coffee table, and ambient lighting.",
        "cardFeatures": "Video conferencing | Projector | Catering Available",
        "spaceType": "meeting room",
        "createdAt": "2025-03-02T00:52:28.680Z",
        "updatedAt": "2025-04-30T13:37:18.515Z",
        "publishedAt": "2025-04-30T13:37:18.531Z"
    },
    {
        "id": 13,
        "documentId": "g642gvihycua2ntbwbu7qrxk",
        "name": "Grand Conference Hall",
        "description": "Spacious conference venue ideal for large corporate events...",
        "capacity": 200,
        "pricePerHour": 250,
        "setupOptions": { /* Omitted for brevity */ },
        "amenities": { /* Omitted for brevity */ },
        "rules": "- Minimum booking: 4 hours\n- 72-hour cancellation policy...",
        "slug": "grand-conference-hall",
        "cardTitle": "Grand Conference Hall",
        "cardDescription": "Versatile conference space for up to 200 guests",
        "cardFeatures": "Full AV Setup | Catering | Event Support",
        "spaceType": "confrence",
        "createdAt": "2025-03-02T00:52:50.538Z",
        "updatedAt": "2025-04-30T13:37:32.767Z",
        "publishedAt": "2025-04-30T13:37:32.776Z"
    }
];
// --- End Mock Data ---

// --- Venue Interface (Unchanged) ---
interface Venue {
  id: number;
  documentId: string;
  name: string;
  cardTitle: string;
  cardDescription: string;
  cardFeatures: string;
  pricePerHour: number;
}

// Helper function to generate image path from title
const getImagePathFromTitle = (title: string): string => {
  if (!title) {
    // Fallback if title is missing for some reason
    return "/placeholder-venue.jpg"; // Keep a placeholder just in case
  }
  const filename = title + '.jpg'; // Replaces spaces with hyphens, converts to lowercase, appends .jpg
  return `/${filename}`; // Prepends slash for root public directory
};


export default function SelectExperience() {

  // Removed placeholderImageUrl variable

  // Directly use the mock data - no fetching or state needed
  const experiences: Venue[] = mockVenueData;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-5 py-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Optional: Keep background blur if desired */}
      {/* <div className="blur">
        <div className="blob" />
      </div> */}
      <main className="flex flex-col w-full max-w-6xl mx-auto">
        {/* Header */}
         <div className="flex flex-col items-center mb-8 w-full text-center">
          {/* Make sure the logo exists in /public/logo_lamarka.svg */}
          <Image
            src="/logo_lamarka.svg"
            alt="lamarka logo"
            width={120}
            height={25}
            className="mb-8 sm:mb-10"
            priority
          />
          <div className="space-y-3 max-w-[460px]">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Choose Your Space to Create Change
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Which space will help you make your mark?
            </p>
          </div>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 w-full mb-12">
          {experiences.map((venue: Venue, index: number) => { // Added index for priority loading
            // Generate image path using the helper function
            const imageUrl = getImagePathFromTitle(venue.cardTitle);
            // Use venue name or title for alt text as a fallback
            const imageAlt = venue.cardTitle || venue.name || "Venue image";

            return (
              // Link wraps the entire card, navigating on click
              // Passes documentId as 'id' query parameter to the /venue page
              <Link href={`/venue?id=${venue.documentId}`} key={venue.documentId} className="block group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg bg-background text-foreground">
                  <CardHeader className="p-6 sm:p-4">
                    <CardTitle className="text-xl font-bold mb-2">{venue.cardTitle}</CardTitle>
                    <CardDescription className="text-base sm:text-sm">
                      {venue.cardDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-4 pt-0">
                    {/* Image Section - Now uses dynamic imageUrl */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-6">
                      <Image
                        src={imageUrl} // Use the generated image path
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        priority={index < 2} // Prioritize loading the first two images
                        // Optional: Add error handling if needed
                        // onError={(e) => { e.currentTarget.src = '/placeholder-venue.jpg'; }} // Fallback to placeholder on error
                      />
                    </div>
                    {/* Features Text */}
                    <p className="text-base sm:text-sm text-muted-foreground mb-4">
                      {venue.cardFeatures}
                    </p>
                    {/* Price and Link Indication */}
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-semibold">
                        From {venue.pricePerHour} SAR/hour
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer link */}
         <div className="text-center">
          {/* Ensure you have a /contact page or adjust href */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-base sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Need guidance? Let's talk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}