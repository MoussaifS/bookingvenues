// Ensure this file is placed correctly in your project, e.g., app/select-experience/page.tsx or similar

'use client' // Necessary for client-side interactions like Link clicks

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path if needed
import { ArrowRight } from "lucide-react";

// --- Mock Data (Unchanged) ---
const mockVenueData = [
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
    },
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
        "cardTitle": "Executive Meeting Room A", // Use this for filename
        "cardDescription": "Stylish lounge space with plush seating, ideal for casual meetings or relaxed breakout sessions. Includes bottled water, coffee table, and ambient lighting.",
        "cardFeatures": "Video conferencing | Projector | Catering Available",
        "spaceType": "meeting room",
        "createdAt": "2025-03-02T00:52:28.680Z",
        "updatedAt": "2025-04-30T13:37:18.515Z",
        "publishedAt": "2025-04-30T13:37:18.531Z"
    },
];
// --- End Mock Data ---

// --- Venue Interface (Updated) ---
interface Venue {
  id: number;
  documentId: string;
  name: string;
  cardTitle: string;
  cardDescription: string;
  cardFeatures: string;
  pricePerHour: number;
  capacity: number;
  spaceType: string;
}

// Helper function to generate image path from title
const getImagePathFromTitle = (title: string): string => {
  if (!title) {
    // Fallback if title is missing for some reason
    return "/static/images/placeholder-venue.jpg"; // Keep a placeholder just in case
  }
  // Fixes the filename format to match the actual files in /public/static/images
  return `/static/images/${title}.JPG`; // Use correct path and extension
};


export default function SelectExperience() {

  // Removed placeholderImageUrl variable

  // Directly use the mock data - no fetching or state needed
  const experiences: Venue[] = mockVenueData;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-4 sm:px-6 py-6 sm:py-8 md:p-8 lg:p-10 font-[family-name:var(--font-geist-sans)]">
      {/* Optional: Keep background blur if desired */}
      {/* <div className="blur">
        <div className="blob" />
      </div> */}
      <main className="flex flex-col w-full max-w-[540px] sm:max-w-[640px] md:max-w-4xl lg:max-w-6xl mx-auto">
        {/* Header */}
         <div className="flex flex-col items-center mb-8 md:mb-12 w-full text-center">
          {/*  logo text in */}
         <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-gray-100 tracking-tight pt-16 md:pt-6 mb-8 md:mb-4">
            Neonexus
          </h1>
          <div className="space-y-3 max-w-[320px] sm:max-w-[460px]">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
              Choose Your Space to Create Change
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              Which space will help you make your mark?
            </p>
          </div>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 w-full mb-12">
          {experiences.map((venue: Venue, index: number) => { // Added index for priority loading
            // Generate image path using the helper function
            const imageUrl = getImagePathFromTitle(venue.cardTitle);
            // Use venue name or title for alt text as a fallback
            const imageAlt = venue.cardTitle || venue.name || "Venue image";

            return (
              // Link wraps the entire card, navigating on click
              // Passes documentId as 'id' query parameter to the /venue page
              <Link href={`/venue?id=${venue.documentId}`} key={venue.documentId} className="block group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg bg-background text-foreground border-2 hover:border-primary/20">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold mb-2">{venue.cardTitle}</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      {venue.cardDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    {/* Image Section - Now uses dynamic imageUrl */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-4 md:mb-6">
                      <Image
                        src={imageUrl} // Use the generated image path
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2} // Prioritize loading the first two images
                        loading="eager" // Ensure immediate loading on mobile
                        fetchPriority="high" // High priority fetch for mobile
                        // Add error handling
                        onError={(e) => { e.currentTarget.src = '/placeholder-venue.jpg'; }}
                      />
                    </div>
                    {/* Space Type and Capacity Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {venue.spaceType}
                      </span>
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Capacity: {venue.capacity}
                      </span>
                    </div>
                    {/* Features Text */}
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4">
                      {venue.cardFeatures}
                    </p>
                    {/* Price and Link Indication */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <p className="text-base md:text-xl font-semibold">
                        From {venue.pricePerHour} SAR/hour
                      </p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        View Details
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer link */}
         <div className="text-center mt-4 sm:mt-6 md:mt-8">
          {/* Ensure you have a /contact page or adjust href */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-2 px-4 hover:bg-muted/50 rounded-full"
          >
            Need guidance? Let's talk
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}