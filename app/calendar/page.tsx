import { Navbar } from "@/components/ui/navbar";
import { Construction } from "lucide-react";
import { DemoEventList } from "./components/demo-event-list"; // Ensure this import is correct

// Remove unused imports like Button, Card, etc. if they are no longer used directly here

export default function CalendarPage() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-5xl mx-auto">

          {/* --- Demo Section --- */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-semibold tracking-tight text-center mb-8">
              Here's a glimpse of what's coming...
            </h2>

            {/* Render the Client Component */}
            <DemoEventList />

          </div>
          {/* --- End Demo Section --- */}

          {/* Under Construction Message */}
          <div className="flex flex-col items-center justify-center text-center gap-6 mb-12 md:mb-16">
            <Construction className="w-16 h-16 text-muted-foreground" />
            <h1 className="text-3xl font-bold tracking-tight">Calendar Coming Soon!</h1>
            <p className="text-muted-foreground max-w-xl">
              The Calendar page is currently being built! Soon, this space will showcase upcoming public events hosted at Neonexus venues, created by both users and our team. You'll be able to browse and reserve spots, similar to platforms like Luma.
            </p>
          </div>

          

        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} Neonexus. All rights reserved.
      </footer>
    </div>
  );
}