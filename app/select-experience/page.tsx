import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const experiences = [
  {
    title: "Conference Room",
    description: "For big events",
    price: 999,
    monthly: {
      amount: 41.62,
      months: 24
    },
    image: "/conference-room.jpg",
    theme: "dark"
  },
  {
    title: "Meeting Room",
    description: "For private events",
    price: 399,
    monthly: {
      amount: 33.25,
      months: 12
    },
    image: "/meeting-room.jpg",
    theme: "light"
  }
];

export default function SelectExperience() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-5xl">
        <div className="flex flex-col items-center gap-8 w-full text-center">
          <Image
            src="/logo_lamarka.svg"
            alt="lamarka logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Select Your Experience
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose the perfect space for your next event
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {experiences.map((exp, index) => (
            <Link href="/venue" key={index} className="block group">
              <Card className={`h-full overflow-hidden transition-all hover:shadow-lg ${
                exp.theme === 'dark' ? 'bg-background text-foreground' : 'bg-background/50 backdrop-blur'
              }`}>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-2xl font-bold">{exp.title}</CardTitle>
                  <CardDescription className="text-base">
                    {exp.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold">
                      From ${exp.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or ${exp.monthly.amount}/mo. for {exp.monthly.months} mo.*
                    </p>
                  </div>
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center">
          * Financing terms apply. Monthly pricing requires approved credit.
        </p>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <ArrowRight className="w-4 h-4" />
          Back to Home
        </Link>
      </footer>
    </div>
  );
}