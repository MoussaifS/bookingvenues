import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Users, Sparkles, Shield } from "lucide-react";

const features = [
{
  icon: <Users className="w-6 h-6" />,
  title: "Flexible Spaces",
  description: "Multiple setup options to accommodate any event type and size"
},
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Premium Amenities",
    description: "High-end equipment and services included with every booking"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Prime Location",
    description: "Easily accessible venues in premium locations"
  }
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
        <div className="flex flex-col items-center gap-8 w-full">
          
          <Image
            src="/logo_lamarka.png"  // or .jpg
            alt="lamarka logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="/select-experience"
            >
              Select Your Experience
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/venue"
            >
              Get in touch
            </a>
          </div>
        </div>

        <section className="w-full space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Why Choose Our Venues</h2>
            <p className="text-muted-foreground">
              Experience seamless venue booking with our premium features
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-muted p-2">
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="w-full space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight">Find Us</h2>
            <p className="text-muted-foreground">
              Conveniently located in the heart of the city
            </p>
          </div>
          
          <Card className="border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <CardContent className="p-0">
              <div className="aspect-video relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4661557352087!2d46.67431861500953!3d24.700881284128068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f030066b47eeb%3A0x8dafea4b54f90e38!2sNeonexus!5e0!3m2!1sen!2s!4v1708366144495!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.lamarka.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to lamarka.com →
        </a>
      </footer>
    </div>
  );
}
