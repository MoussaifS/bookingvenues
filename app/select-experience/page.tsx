'use client'

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from 'react'
import { getAllVenues } from "@/lib/api"

export default function SelectExperience() {
  const [experiences, setExperiences] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExperiences() {
      try {
        const response = await getAllVenues()
        setExperiences(response)
      } catch (error) {
        console.error('Error loading experiences:', error)
      } finally {
        setLoading(false)
      }
    }

    loadExperiences()
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!experiences?.data) return <div className="min-h-screen flex items-center justify-center">No experiences found</div>

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-5 py-8 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="blur">
        <div className="blob" />
      </div>
      <main className="flex flex-col w-full max-w-6xl mx-auto">
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
          {experiences.data.map((exp: any, index: number) => (
            <Link href={`/venue?id=${exp.id}`} key={exp.id} className="block group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg bg-background text-foreground">
                <CardHeader className="p-6 sm:p-4">
                  <CardTitle className="text-xl font-bold mb-2">{exp.cardTitle}</CardTitle>
                  <CardDescription className="text-base sm:text-sm">
                    {exp.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 sm:p-4 pt-0">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-6">
                    <Image
                      src={exp.image || "/placeholder.jpg"}
                      alt={exp.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="text-base sm:text-sm text-muted-foreground mb-4">
                    {exp.CardFeatures}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">
                      From ${exp.pricePerHour}/hour
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium group-hover:text-foreground transition-colors">
                      Start your journey
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

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