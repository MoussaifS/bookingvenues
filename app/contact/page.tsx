import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button"; // Import Button
import { Info, ExternalLink, Linkedin } from "lucide-react"; // Import Linkedin icon
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center p-8 text-center gap-6">
        
        {/* Added LinkedIn Button Link */}
        <Link
          href="https://www.linkedin.com/in/souhail-mousssaif/"
          target="_blank"
          rel="noopener noreferrer"
          passHref // Recommended when wrapping custom components like Button
        >
          <Button variant="outline"> {/* Using outline variant for visual distinction */}
            <Linkedin className="h-4 w-4 mr-2" /> {/* Added icon */}
            Connect on LinkedIn
          </Button>
        </Link>
        
        {/* Existing Info Icon and Text */}
        <Info className="w-16 h-16 text-muted-foreground mt-4" /> {/* Added small top margin */}
        <h1 className="text-3xl font-bold tracking-tight">About This Demo</h1>
        <p className="text-muted-foreground max-w-lg">
          Please note: This website is a visual demonstration showcasing a potential technology tool designed to enhance Neonexus's venue booking workflow. All images, logos, and names associated with Neonexus are used here solely for illustrative purposes and belong to Neonexus.
        </p>
        <p className="text-muted-foreground max-w-lg">
          This is not the official Neonexus website.
        </p>
        
        {/* Existing Official Website Link */}
        <Link
          href="https://www.Neonexus.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Visit Official Neonexus Website
          <ExternalLink className="h-4 w-4" />
        </Link>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Demo Project.
      </footer>
    </div>
  );
}