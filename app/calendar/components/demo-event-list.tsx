'use client';

// Removed Button import
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from "lucide-react";
// *** CHANGE HERE: Import toast directly from sonner ***
import { toast } from 'sonner';
// *** REMOVE: No longer need useToast from shadcn/ui ***
// import { useToast } from "@/components/ui/use-toast";

// --- Demo Data (Static) ---
const demoEvents = [
  // ... (demoEvents array remains the same) ...
  {
    id: 1,
    title: "Web3 Innovators Meetup: Riyadh Chapter",
    date: "November 12, 2024",
    time: "7:00 PM - 9:30 PM",
    venue: "Grand Conference Hall",
    host: "KSA Blockchain Collective",
    description: "Connect with developers, founders, and enthusiasts exploring the future of decentralized tech in the Kingdom.",
  },
  {
    id: 2,
    title: "Saudi Tech Investment Forum: Seed Stage Showcase",
    date: "November 28, 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "Exhibition Space",
    host: "Vision Ventures KSA",
    description: "Discover promising early-stage Saudi tech startups seeking investment and partnerships. Keynotes and networking sessions.",
  },
  {
    id: 3,
    title: "AI in PropTech: Transforming Real Estate",
    date: "December 5, 2024",
    time: "2:00 PM - 4:00 PM",
    venue: "Executive Meeting Room B",
    host: "Neonexus Insights",
    description: "Panel discussion on how Artificial Intelligence is reshaping property management, valuation, and development.",
  },
];
// --- End Demo Data ---

export function DemoEventList() {
  // *** REMOVE: No longer need to call useToast hook ***
  // const { toast } = useToast();

  // Function to show a random toast message using sonner
  const showDemoToast = () => {
    const messages = ["Coming soon!", "This is just a demo.", "Functionality under development."];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // *** CHANGE HERE: Use sonner's toast function syntax ***
    // Simple message:
    toast(randomMessage);

    // Or use semantic methods (requires richColors prop on Toaster for default styling):
    // toast.info(randomMessage);
    // toast.message("Demo Feature", { description: randomMessage }); // If you want title + description
  };

  return (
    <>
      {/* Grid for Demo Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoEvents.map((event) => (
          <Card key={event.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
            {/* CardHeader and CardContent remain the same */}
            <CardHeader>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-sm pt-1">
                 <CalendarDays className="w-4 h-4 flex-shrink-0" />
                 <span>{event.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
               {/* ... content details ... */}
               <div className="flex items-center gap-1.5 text-sm text-muted-foreground"> <Clock className="w-4 h-4 flex-shrink-0" /> <span>{event.time}</span> </div>
               <div className="flex items-center gap-1.5 text-sm text-muted-foreground"> <MapPin className="w-4 h-4 flex-shrink-0" /> <span className="font-medium">{event.venue}</span> </div>
               <p className="text-sm text-muted-foreground pt-1"> {event.description} </p>
               <p className="text-xs text-muted-foreground/80 pt-2"> Hosted by: {event.host} </p>
            </CardContent>

            {/* CardFooter now contains a clickable div */}
            <CardFooter>
              <div
                className="w-full text-center py-2 px-4 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 transition-colors text-sm font-medium"
                onClick={showDemoToast} // Calls the updated function
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') showDemoToast(); }}
              >
                Reserve Spot (Demo)
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
       <p className="text-center text-sm text-muted-foreground mt-8">
         (Click Reserve Spot for a demo message.)
       </p>
    </>
  );
}