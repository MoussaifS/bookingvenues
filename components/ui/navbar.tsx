'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, MessageSquare, Building } from "lucide-react" // Import Building icon
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />
    },
    { // Add the new Venues link here
      name: "Venues",
      href: "/select-experience",
      icon: <Building className="h-5 w-5" />
    },
    {
      name: "Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      name: "Get in Touch",
      href: "/contact",
      icon: <MessageSquare className="h-5 w-5" />
    }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Neonexus</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
             {/* Update grid columns for mobile view */}
            <div className="grid grid-cols-4 h-16">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
