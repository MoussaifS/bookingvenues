'use client'

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Users, Clock, Calendar as CalendarIcon } from "lucide-react"
import { BookingForm } from "./components/booking-form"

export default function Venue() {
  const mockVenue = {
    name: "Grand Plaza Events Center",
    description: "A modern, versatile event space perfect for corporate events, weddings, and social gatherings. Located in the heart of the city with stunning views.",
    capacity: 500,
    pricePerHour: 299,
    location: "123 Business District, Downtown",
    images: ["/venue-1.jpg", "/venue-2.jpg", "/venue-3.jpg"],
    setupOptions: [
      "Theater (500 guests)",
      "Classroom (300 guests)",
      "Banquet (400 guests)",
      "Reception (450 guests)"
    ],
    amenities: [
      "High-speed WiFi",
      "Professional Sound System",
      "Full Kitchen",
      "Free Parking",
      "Stage Area"
    ]
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      <main className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{mockVenue.name}</h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground">{mockVenue.location}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Images and Details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.jpg"
                    alt="Venue main image"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About the Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockVenue.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">Up to {mockVenue.capacity} guests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Starting at</p>
                      <p className="text-sm text-muted-foreground">${mockVenue.pricePerHour}/hour</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup Options</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rules">Rules & Policies</TabsTrigger>
              </TabsList>
              <TabsContent value="setup">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {mockVenue.setupOptions.map((option, index) => (
                        <Badge key={index} variant="secondary" className="justify-center">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Add other TabsContent sections as needed */}
            </Tabs>
          </div>

          {/* Right Column - Booking Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check Availability</CardTitle>
                <CardDescription>Select your preferred date</CardDescription>
              </CardHeader>
              // Replace the Button component in the Calendar Card with BookingForm
              <CardContent>
                <Calendar
                  mode="single"
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <BookingForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}