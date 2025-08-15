'use client'

import { Suspense, useState } from 'react' // Removed useEffect
import { useSearchParams } from 'next/navigation'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Users, Clock, Wifi, Tv, ParkingCircle, Utensils, Wind, CheckSquare } from "lucide-react"
import { BookingForm } from "./components/booking-form" // Assuming this path is correct
// Removed: import { getVenue } from "@/lib/api"

// --- Image Interfaces (Keep as they define structure) ---
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

// --- Venue Interface (Keep as it defines structure) ---
interface Venue {
  id: number; // Unique numeric ID from the data
  documentId: string; // Unique string ID used for lookup
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  setupOptions: {
    layouts?: string[];
    defaultSetup?: string;
    availableEquipment?: string[];
  };
  amenities: {
    included?: string[];
    additionalServices?: string[];
  };
  rules: string;
  slug: string | null;
  cardTitle: string; // Keep if needed elsewhere, though not used directly here
  cardDescription: string; // Keep if needed elsewhere
  cardFeatures: string; // Keep if needed elsewhere
  spaceType: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images?: ImageObject[]; // Keep optional for images
}

// --- MOCK VENUE DETAILS ---
// Keyed by the 'documentId' that will be passed in the URL (?id=...)
// Use the full details for each venue here.
const mockVenueDetails: { [key: string]: Venue } = {
  "rn3uij5x3ee3mxldladrisu7": { // Executive Meeting Room B
    id: 10,
    documentId: "rn3uij5x3ee3mxldladrisu7",
    name: "Executive Meeting Room B",
    description: "Modern, well-lit conference room with seating for 10, equipped with a large screen, whiteboard, flipchart, and high-speed Wi-Fi—perfect for meetings, presentations, and team sessions.",
    capacity: 10, // Adjusted capacity to match description better
    pricePerHour: 75,
    setupOptions: {
      layouts: ["boardroom", "u-shape", "classroom"],
      defaultSetup: "boardroom",
      availableEquipment: ["smartTV", "videoconference", "whiteboard", "flipchart"],
    },
    amenities: {
      included: ["high-speed wifi", "bottled water", "climate control", "whiteboard markers", "natural lighting"],
      additionalServices: ["catering available", "printing services"],
    },
    rules: "- Minimum booking: 1 hour\n- 24-hour cancellation policy\n- No food allowed except arranged catering\n- Please leave the room as you found it",
    slug: "executive-meeting-room-b",
    cardTitle: "Executive Meeting Room B", // Not directly used on this page
    cardDescription: "Bright, modern meeting room...", // Not directly used on this page
    cardFeatures: "Video conferencing | Projector | Catering Available", // Not directly used on this page
    spaceType: "meeting room",
    createdAt: "2025-04-30T11:29:27.106Z",
    updatedAt: "2025-04-30T11:34:10.565Z",
    publishedAt: "2025-04-30T11:34:10.580Z",
    images: [], // Add mock image objects here if needed
  },
  "g642gvihycua2ntbwbu7qrxk": { // Grand Conference Hall
    id: 13,
    documentId: "g642gvihycua2ntbwbu7qrxk",
    name: "Grand Conference Hall",
    description: "Spacious conference venue ideal for large corporate events, seminars, and workshops. Features high ceilings, modular space design, and state-of-the-art AV equipment.",
    capacity: 200,
    pricePerHour: 250,
    setupOptions: {
      layouts: ["theater", "classroom", "banquet", "exhibition", "reception"],
      defaultSetup: "theater",
      availableEquipment: ["professional sound system", "stage lighting", "dual projectors", "wireless microphones", "podium"],
    },
    amenities: {
      included: ["high-speed wifi", "registration desk", "breakout areas", "coat check", "climate control", "backup generator"],
      additionalServices: ["full-service catering", "event planning assistance", "AV technician", "security personnel"],
    },
    rules: "- Minimum booking: 4 hours\n- 72-hour cancellation policy\n- Outside catering subject to approval\n- Security deposit required\n- Insurance certificate required for events over 100 people",
    slug: "grand-conference-hall",
    cardTitle: "Grand Conference Hall", // Not directly used on this page
    cardDescription: "Versatile conference space...", // Not directly used on this page
    cardFeatures: "Full AV Setup | Catering | Event Support", // Not directly used on this page
    spaceType: "conference", // Corrected typo
    createdAt: "2025-03-02T00:52:50.538Z",
    updatedAt: "2025-04-30T13:37:32.767Z",
    publishedAt: "2025-04-30T13:37:32.776Z",
    images: [], // Add mock image objects here if needed
  },
  "vbjloesj4wtsklknq7mmv1ej": { // Executive Meeting Room A
    id: 12,
    documentId: "vbjloesj4wtsklknq7mmv1ej",
    name: "Executive Meeting Room A",
    description: "Stylish lounge space with plush seating, ideal for casual meetings or relaxed breakout sessions. Includes bottled water, coffee table, and ambient lighting.",
    capacity: 12,
    pricePerHour: 75,
    setupOptions: {
      layouts: ["casual seating", "lounge"],
      defaultSetup: "lounge",
      availableEquipment: ["smartTV", "whiteboard", "glass writing wall"],
    },
    amenities: {
      included: ["high-speed wifi", "bottled water", "comfortable lounge seating", "climate control", "natural lighting"],
      additionalServices: ["catering available", "printing services"],
    },
    rules: "- Minimum booking: 1 hour\n- 24-hour cancellation policy\n- No food allowed except arranged catering\n- Please leave the room as you found it",
    slug: "executive-meeting-room-a",
    cardTitle: "Executive Meeting Room", // Not directly used on this page
    cardDescription: "Stylish lounge space...", // Not directly used on this page
    cardFeatures: "Video conferencing | Projector | Catering Available", // Not directly used on this page
    spaceType: "meeting room",
    createdAt: "2025-03-02T00:52:28.680Z",
    updatedAt: "2025-04-30T13:37:18.515Z",
    publishedAt: "2025-04-30T13:37:18.531Z",
    images: [], // Add mock image objects here if needed
  },
  
};
// --- END MOCK VENUE DETAILS ---

// Map venue documentIds to static images stored in public/static/images
// Filenames have spaces and uppercase letters; we'll URI-encode spaces.
const venueImageMap: Record<string, string> = {
  rn3uij5x3ee3mxldladrisu7: "/static/images/Executive%20Meeting%20Room%20B.JPG",
  g642gvihycua2ntbwbu7qrxk: "/static/images/Grand%20Conference%20Hall.JPG",
  vbjloesj4wtsklknq7mmv1ej: "/static/images/Executive%20Meeting%20Room%20A.JPG",
};


// --- Helper Function to get Image URL (remains useful for consistency/placeholders) ---
const getImageUrl = (image: ImageObject | undefined): string => {
  // **IMPORTANT**: Ensure placeholder.jpg exists in your /public folder
  const placeholder = "/placeholder.jpg";
  if (!image) return placeholder;

  // If you add full URLs to mock data images, remove the apiBaseUrl logic
  const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || ''; // Keep if mock images use relative paths

  const preferredUrl =
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.formats?.thumbnail?.url ||
    image.url;

  if (!preferredUrl) return placeholder;
  // Adjust if your mock image URLs are absolute or relative
  return preferredUrl.startsWith('/') ? `${apiBaseUrl}${preferredUrl}` : preferredUrl;
};
// --- End Helper Function ---

// --- Helper Function for Amenities Icons (Unchanged) ---
const getAmenityIcon = (amenity: string) => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes('wifi')) return <Wifi className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('projector') || lowerAmenity.includes('av') || lowerAmenity.includes('smarttv') || lowerAmenity.includes('screen')) return <Tv className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('parking')) return <ParkingCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('catering')) return <Utensils className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('climate') || lowerAmenity.includes('air conditioning')) return <Wind className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  if (lowerAmenity.includes('whiteboard') || lowerAmenity.includes('flipchart') || lowerAmenity.includes('markers')) return <CheckSquare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />;
  return <CheckSquare className="h-4 w-4 mr-2 text-primary flex-shrink-0" />; // Default icon
}
// --- End Amenities Helper ---


// Main Component wrapper with Suspense
export default function VenuePage() {
  // Suspense remains useful for useSearchParams and potential future lazy loading
  return (
    <Suspense fallback={<VenueLoadingSkeleton />}>
      <Venue />
    </Suspense>
  );
}

// Loading Skeleton Component (Keep as Suspense fallback)
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


// The actual Venue component using Mock Data
function Venue() {
  const searchParams = useSearchParams();
  const venueId = searchParams.get('id'); // This gets the documentId from the URL

  // State for the selected date in the calendar
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [promoCode, setPromoCode] = useState<string>(""); // Keep if BookingForm uses it

  // --- Find Venue Data ---
  // Directly look up the venue from mock data based on the ID from URL
  const venue: Venue | undefined = venueId ? mockVenueDetails[venueId] : undefined;
  // ---

  // --- Render States ---
  // No loading state needed for fetching
  // Error state is now just if venue is not found in mock data
  if (!venueId || !venue) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center text-muted-foreground">
            Venue not found or invalid ID specified. Please check the link or select a venue again.
        </div>
    );
  }

  // --- Prepare Data for Rendering ---
  let imageUrl: string;
  let imageAlt: string;

  const primaryImage = venue.images?.[0];
  // 1. Prefer explicit static mapping for reliability
  if (venueImageMap[venue.documentId]) {
    imageUrl = venueImageMap[venue.documentId];
    imageAlt = venue.name || "Venue image";
  } else if (primaryImage && (primaryImage.url || (primaryImage.formats && (primaryImage.formats.medium?.url || primaryImage.formats.small?.url || primaryImage.formats.thumbnail?.url)))) {
    // 2. Use provided image object (if later real data supplies it)
    imageUrl = getImageUrl(primaryImage);
    imageAlt = primaryImage.alternativeText || venue.name || "Venue image";
  } else {
    // 3. Fallback slug-based heuristic (may 404 if file not present)
    const imageNameSlug = venue.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    imageUrl = `/${imageNameSlug}.jpg`;
    imageAlt = venue.name || "Venue image";
  }

  // Safely access nested properties
  const setupLayouts = venue.setupOptions?.layouts || [];
  const setupEquipment = venue.setupOptions?.availableEquipment || [];
  const includedAmenities = venue.amenities?.included || [];
  const additionalServices = venue.amenities?.additionalServices || [];

  // Split rules string into an array
  const rulesList = venue.rules
    ? venue.rules.split('\n').map(line => line.trim().replace(/^- /, '')).filter(line => line !== '')
    : [];


  // --- JSX Structure (Mostly Unchanged) ---
  return (
    <div className="min-h-screen  pt-10 md:pt-0  bg-background">
      <main className="container mx-auto max-w-7xl relative z-10 pt-20 md:pt-10 pb-4 md:pb-10">
        {/* Header Section */}
        <div className="space-y-2 mb-8">
           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{venue.name}</h1>
        </div>

        {/* Main Content Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0">
          {/* Left/Main Column */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
             {/* Image Card */}
             <Card className="overflow-hidden shadow-md">
                <div className="aspect-video relative bg-muted">
                   <Image
                        src={imageUrl} // Uses placeholder if mock data has no image
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 66vw"
                    />
                </div>
             </Card>

             {/* About Card */}
             <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>About {venue.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap mb-6">
                    {venue.description || 'No description available.'}
                </p>
                {/* Details Grid */}
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
                        {venue.pricePerHour} SAR/hour {/* Updated currency */}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Tabs defaultValue="amenities" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-1">
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
          <div className="space-y-6 md:sticky md:top-24 md:h-[calc(100vh-6rem)]">
             <Card className="shadow-lg">
                 <CardHeader>
                   <CardTitle>Book Your Date</CardTitle>
                   <CardDescription>Select a date to check times</CardDescription> {/* Updated description */}
                 </CardHeader>
                 <CardContent>
                   <div className="flex justify-center">
                     <Calendar
                       mode="single"
                       selected={selectedDate}
                       onSelect={setSelectedDate}
                       className="rounded-md border p-2 w-full max-w-xs sm:max-w-none"
                     />
                   </div>
                   <div className="mt-4 space-y-4 border-t pt-4">
                     {/* Pass necessary props to BookingForm */}
                     <BookingForm
                       venueId={venue.documentId} // Pass the string documentId     // Pass name for context
                       promoCode={promoCode}
                       selectedDate={selectedDate}
                       pricePerHour={venue.pricePerHour}
                       // Add any other props BookingForm needs
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