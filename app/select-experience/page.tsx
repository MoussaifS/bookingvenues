'use client'

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from 'react'
import { getAllVenues } from "@/lib/api"

// Define interfaces for the image structure from the API
interface ImageFormat {
  url: string;
  width?: number;
  height?: number;
}

interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}

interface ImageObject {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width?: number;
  height?: number;
  formats?: ImageFormats; // Make formats optional
  url: string; // Original image URL
  provider_metadata?: any; // Add other fields if needed
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Update the Experience interface
interface Experience {
  id: string;
  name: string;
  cardTitle: string;
  cardDescription: string;
  images: ImageObject[]; // Images array
  cardFeatures: string; // Corrected casing based on API response
  pricePerHour: number;
  // Add any other relevant fields from your API response if needed
  description?: string;
  capacity?: number;
  slug?: string | null;
  documentId: string;
  // ... other fields
}

// ExperienceResponse interface remains the same if getAllVenues returns { data: Experience[] }
interface ExperienceResponse {
  data: Experience[];
}

// --- Helper Function to get Image URL ---
// You might want to move this to a utils file
const getImageUrl = (image: ImageObject | undefined): string => {
  const placeholder = "/placeholder.jpg";
  if (!image) return placeholder;

  // Use the correct environment variable name from your .env file
  // CHANGED HERE: Using NEXT_PUBLIC_STRAPI_API_URL instead of NEXT_PUBLIC_API_URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

  // Prioritize formats: medium -> small -> thumbnail -> original URL
  const preferredUrl =
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.formats?.thumbnail?.url ||
    image.url;

  if (!preferredUrl) return placeholder; // Fallback if no URL found

  // Prepend the base URL if the URL is relative (starts with '/')
  // Adjust this logic if your API provides full URLs already
  return preferredUrl.startsWith('/') ? `${apiBaseUrl}${preferredUrl}` : preferredUrl;
};
// --- End Helper Function ---


export default function SelectExperience() {
  const [experiences, setExperiences] = useState<ExperienceResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExperiences() {
      try {
        // Make sure getAllVenues returns data structured as ExperienceResponse
        // If it returns just the array, adjust accordingly
        const response = await getAllVenues();
        // Basic type check (you might want more robust validation)
        if (response && Array.isArray(response.data)) {
           setExperiences(response as ExperienceResponse);
        } else {
            // Handle case where response is not as expected, e.g., return just the array
            // setExperiences({ data: response }); // Uncomment if getAllVenues returns just the array
            console.error('Unexpected response structure from getAllVenues:', response);
            setExperiences(null); // Set to null or empty data
        }
      } catch (error) {
        console.error('Error loading experiences:', error)
        setExperiences(null); // Set to null on error
      } finally {
        setLoading(false)
      }
    }

    loadExperiences()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  // Adjusted check for potentially null experiences or empty data array
  if (!experiences?.data || experiences.data.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No experiences found</div>
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-5 py-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="blur">
        <div className="blob" />
      </div>
      <main className="flex flex-col w-full max-w-6xl mx-auto">
        {/* Header remains the same */}
         <div className="flex flex-col items-center mb-8 w-full text-center">
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


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 w-full mb-12">
          {experiences.data.map((exp: Experience) => {
            // Get the first image object, if available
            const firstImage = exp.images?.[0];
            // Use the helper function to get the final URL
            const imageUrl = getImageUrl(firstImage);
            // Determine alt text: use provided alt text, fallback to venue name
            const imageAlt = firstImage?.alternativeText || exp.name || "Venue image";

            return (
              <Link href={`/venue?id=${exp.documentId}`} key={exp.documentId} className="block group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg bg-background text-foreground">
                  <CardHeader className="p-6 sm:p-4">
                    <CardTitle className="text-xl font-bold mb-2">{exp.cardTitle}</CardTitle>
                    <CardDescription className="text-base sm:text-sm">
                      {exp.cardDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-4 pt-0">
                    {/* This div needs position: relative for the fill Image */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-6">
                      <Image
                        src={imageUrl} // Use the derived image URL
                        alt={imageAlt} // Use derived alt text
                        fill // Make image fill the container
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw" // Optimization for responsive images
                        priority={exp.id === experiences.data[0].id || exp.id === experiences.data[1].id} // Prioritize loading first few images
                      />
                    </div>
                    <p className="text-base sm:text-sm text-muted-foreground mb-4">
                      {exp.cardFeatures} {/* Use correct property name */}
                    </p>
                    <div className="flex items-center justify-between">
                  
                      <p className="text-xl font-semibold">
                        From {exp.pricePerHour} SAR/hour
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium group-hover:text-foreground transition-colors">
                        Start your journey
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer link remains the same */}
         <div className="text-center">
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