'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Users, Clock, Wifi, Tv, ParkingCircle, Utensils, Wind, CheckSquare } from "lucide-react" // Added CheckSquare for rules
import { BookingForm } from "./components/booking-form"
import { getVenue } from "@/lib/api"
// import { Input } from "@/components/ui/input"

// --- Image Interfaces ---
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
  formats?: ImageFormats;
  url: string;
  createdAt: string;
  updatedAt: string;
}
// --- End Image Interfaces ---

// --- Updated Venue Interface - Reflecting the API response structure ---
interface Venue {
  id: number; // ID is a number in the data
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  setupOptions: { // Object type
    layouts?: string[];
    defaultSetup?: string;
    availableEquipment?: string[];
  };
  amenities: { // Object type
    included?: string[];
    additionalServices?: string[];
  };
  rules: string; // String, potentially with newlines
  slug: string | null;
  cardTitle: string;
  cardDescription: string;
  cardFeatures: string;
  spaceType: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: ImageObject[]; // **IMPORTANT**: Make images optional as it's missing in sample data
  // Add other fields if they exist in your full response
}

// Interface for the API response for a single venue
interface VenueResponse {
  data: Venue; // Single venue object wrapped in 'data'
  meta?: any;
}

// --- Helper Function to get Image URL ---
const getImageUrl = (image: ImageObject | undefined): string => {
  const placeholder = "/placeholder.jpg"; // Your placeholder image
  if (!image) return placeholder;
  const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

  const preferredUrl =
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.formats?.thumbnail?.url ||
    image.url;

  if (!preferredUrl) return placeholder;
  return preferredUrl.startsWith('/') ? `${apiBaseUrl}${preferredUrl}` : preferredUrl;
};
// --- End Helper Function ---

// --- Helper Function for Amenities Icons ---
const getAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes('wifi')) return <Wifi className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('projector') || lowerAmenity.includes('av') || lowerAmenity.includes('smarttv') || lowerAmenity.includes('screen')) return <Tv className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('parking')) return <ParkingCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('catering')) return <Utensils className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('climate') || lowerAmenity.includes('air conditioning')) return <Wind className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('whiteboard') || lowerAmenity.includes('flipchart') || lowerAmenity.includes('markers')) return <CheckSquare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />; // Example for whiteboard/etc
  // Add more icons as needed
  return <CheckSquare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />; // Default icon
}
// --- End Amenities Helper ---


// Main Component wrapper with Suspense
export default function VenuePage() {
  return (
    <Suspense fallback={<VenueLoadingSkeleton />}>
      <Venue />
    </Suspense>
  );
}

// Loading Skeleton Component
function VenueLoadingSkeleton() {
 return (
    <div className="min-h-screen p-6 bg-background animate-pulse">
       <div className="container mx-auto max-w-7xl">
          {/* Simplified Skeleton */}
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             <div className="md:col-span-2 space-y-6 md:space-y-8">
                <div className="aspect-video bg-gray-300 rounded-lg"></div>
                <div className="p-6 bg-gray-200 rounded-lg"><div className="h-20 bg-gray-300 rounded"></div></div>
                <div className="p-6 bg-gray-200 rounded-lg"><div className="h-32 bg-gray-300 rounded"></div></div>
             </div>
             <div className="space-y-6 md:sticky md:top-8">
                <div className="p-6 bg-gray-200 rounded-lg shadow-lg"><div className="h-96 bg-gray-300 rounded"></div></div>
             </div>
          </div>
       </div>
    </div>
 );
}


// The actual Venue component
function Venue() {
  const searchParams = useSearchParams();
  const venueId = searchParams.get('id');

  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [promoCode, setPromoCode] = useState<string>(""); // Keep if needed
  useEffect(() => {
    const fetchVenue = async () => {
      if (venueId && typeof venueId === 'string') { // Add this check
        try {
          // Fetch the specific venue - Ensure getVenue populates correctly
          const response = await getVenue(venueId) as VenueResponse;

          if (response && response.data) {
             setVenue(response.data);
          } else {
            console.error('Venue data not found:', response);
            // Handle the case where venue data is not found appropriately
          }
        } catch (error) {
          console.error('Error fetching venue:', error);
          // Handle fetch error appropriately
        } finally {
          setLoading(false);
        }
      } else { // Handle the case where venueId is not a valid string
        console.error('Invalid venueId:', venueId);
        setLoading(false);
        // Optionally, redirect or show an error message
      }
    };

    fetchVenue();
  }, [venueId]); // Keep venueId in the dependency array
  
  // --- Render States ---
  if (loading) return <VenueLoadingSkeleton />;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 p-6 text-center">Error: {error}</div>;
  if (!venue) return <div className="min-h-screen flex items-center justify-center p-6 text-center">Venue not found or unavailable.</div>;

  // --- Prepare Data for Rendering ---
  const primaryImage = venue.images?.[0]; // Handles potentially missing 'images' array
  const imageUrl = getImageUrl(primaryImage); // Will return placeholder if primaryImage is undefined
  const imageAlt = primaryImage?.alternativeText || venue.name || "Venue image";

  // Safely access nested properties using optional chaining
  const setupLayouts = venue.setupOptions?.layouts || [];
  const setupEquipment = venue.setupOptions?.availableEquipment || [];
  const includedAmenities = venue.amenities?.included || [];
  const additionalServices = venue.amenities?.additionalServices || [];

  // Split rules string into an array for rendering, handling potential null/undefined
  const rulesList = venue.rules ? venue.rules.split('\n').map(line => line.trim().replace(/^- /, '')).filter(line => line !== '') : [];


  // --- JSX Structure ---
  return (
    <div className="min-h-screen p-6 bg-background">
      <main className="container mx-auto max-w-7xl relative mt-10 z-10">
        {/* Header Section */}
        <div className="space-y-2 mb-8"> {/* Reduced vertical space */}
           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{venue.name}</h1>           
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left/Main Column */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
             {/* Image Card */}
             <Card className="overflow-hidden shadow-md">
                <div className="aspect-video relative bg-muted"> {/* Added bg-muted for placeholder state */}
                   <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        priority // Prioritize loading this main image
                        sizes="(max-width: 768px) 100vw, 66vw" // Responsive sizes
                    />
                </div>
             </Card>

             {/* About Card */}
             <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>About {venue.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Use pre-wrap to respect newlines in the description */}
                <p className="text-muted-foreground whitespace-pre-wrap mb-6">
                    {venue.description || 'No description available.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-4 border-t">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        Up to {venue.capacity} guests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Starting Price</p>
                      <p className="text-sm text-muted-foreground">
                        ${venue.pricePerHour}/hour
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="amenities" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-1"> {/* Added mb-1 */}
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>

              {/* Amenities Tab */}
              <TabsContent value="amenities">
                <Card className="shadow-sm">
                  <CardContent className="p-6 space-y-4">
                     {includedAmenities.length > 0 ? (
                         <div>
                            <h4 className="font-semibold mb-2 text-base">Included</h4>
                            <ul className="list-none space-y-2">
                               {includedAmenities.map((amenity: string, index: number) => (
                               <li key={`inc-${index}`} className="flex items-center text-sm text-muted-foreground">
                                   {getAmenityIcon(amenity)}
                                   <span>{amenity}</span>
                               </li>
                               ))}
                            </ul>
                         </div>
                     ) : (
                         <p className="text-muted-foreground text-sm">No specific included amenities listed.</p>
                     )}

                     {additionalServices.length > 0 && (
                        <div className="pt-4 border-t">
                           <h4 className="font-semibold mb-2 text-base">Additional Services</h4>
                           <ul className="list-none space-y-2">
                           {additionalServices.map((service: string, index: number) => (
                              <li key={`add-${index}`} className="flex items-center text-sm text-muted-foreground">
                                 {getAmenityIcon(service)}
                                 <span>{service}</span>
                              </li>
                           ))}
                           </ul>
                        </div>
                     )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Setup Options Tab */}
              <TabsContent value="setup">
                 <Card className="shadow-sm">
                    <CardContent className="p-6 space-y-4">
                       {setupLayouts.length > 0 && (
                          <div>
                             <h4 className="font-semibold mb-2 text-base">Possible Layouts</h4>
                             <div className="flex flex-wrap gap-2">
                             {setupLayouts.map((layout: string, index: number) => (
                                <Badge key={`layout-${index}`} variant="secondary">{layout}</Badge>
                             ))}
                             </div>
                          </div>
                       )}
                       {setupEquipment.length > 0 && (
                          <div className={setupLayouts.length > 0 ? "pt-4 border-t" : ""}>
                             <h4 className="font-semibold mb-2 text-base">Available Equipment</h4>
                             <div className="flex flex-wrap gap-2">
                             {setupEquipment.map((equip: string, index: number) => (
                                <Badge key={`equip-${index}`} variant="secondary">{equip}</Badge>
                             ))}
                             </div>
                          </div>
                       )}
                       {(setupLayouts.length === 0 && setupEquipment.length === 0) && (
                          <p className="text-muted-foreground text-sm">No specific setup options detailed.</p>
                       )}
                    </CardContent>
                 </Card>
              </TabsContent>

              {/* Rules Tab */}
              <TabsContent value="rules">
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    {rulesList.length > 0 ? (
                      <ul className="list-none space-y-2 text-sm text-muted-foreground">
                        {rulesList.map((rule: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                              <CheckSquare className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground text-sm">No specific rules listed. Please inquire for details.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Section */}
          <div className="space-y-6 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
             <Card className="shadow-lg">
                 <CardHeader>
                   <CardTitle>Book Your Date</CardTitle>
                   <CardDescription>Check availability below</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <Calendar
                     mode="single"
                     selected={selectedDate}
                     onSelect={setSelectedDate}
                     className="rounded-md border flex justify-center p-0" // Adjusted padding
                     // Consider adding disabled dates logic here based on bookings
                   />
                   <div className="mt-4 space-y-4 border-t pt-4">
                     <BookingForm
                       venueId={venue.id.toString()} // Ensure string ID
                       promoCode={promoCode}
                       selectedDate={selectedDate}
                       pricePerHour={venue.pricePerHour}
                     />
                   </div>
                 </CardContent>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}