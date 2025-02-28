'use client'

import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { MapPin, Users, Clock, Calendar as CalendarIcon } from "lucide-react"
import { BookingForm } from "./components/booking-form"
import { getAllVenues } from "@/lib/api"
import type { VenueResponse } from "@/types/venue"
import { Input } from "@/components/ui/input"

export default function Venue() {
  const [venues, setVenues] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [promoCode, setPromoCode] = useState<string>("")

  useEffect(() => {
    async function loadVenues() {
      try {
        const response = await getAllVenues()
        setVenues(response)
      } catch (error) {
        console.error('Error loading venues:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVenues()
  }, [])

  // Helper function to safely parse arrays
  const parseArrayField = (field: string | null | undefined) => {
    if (!field) return null
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!venues?.data?.[0]) return <div className="min-h-screen flex items-center justify-center">No venues found</div>

  const venue = venues.data[0]
  const setupOptions = parseArrayField(venue.setupOptions)
  const amenities = parseArrayField(venue.amenities)
  const rules = parseArrayField(venue.rules)

  return (
    <div className="min-h-screen p-6 bg-background">
      <main className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{venue.name || 'Unnamed Venue'}</h1>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground">{venue.location || 'Location not specified'}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-muted-foreground">{venue.description || 'No description available'}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-muted-foreground">
                        {venue.capacity ? `Up to ${venue.capacity} guests` : 'Capacity not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Starting at</p>
                      <p className="text-sm text-muted-foreground">
                        ${venue.pricePerHour}/hour
                      </p>
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
                      {setupOptions && setupOptions.length > 0 ? (
                        setupOptions.map((option: string, index: number) => (
                          <Badge key={index} variant="secondary" className="justify-center">
                            {option}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No setup options available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="amenities">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {amenities && amenities.length > 0 ? (
                        amenities.map((amenity: string, index: number) => (
                          <Badge key={index} variant="secondary" className="justify-center">
                            {amenity}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No amenities listed</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="rules">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-2">
                      {rules && rules.length > 0 ? (
                        rules.map((rule: string, index: number) => (
                          <Badge key={index} variant="secondary" className="justify-center">
                            {rule}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No rules specified</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check Availability</CardTitle>
                <CardDescription>Select your preferred date</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-4">
                  <div>
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <BookingForm 
                    venueId={venue.id}
                    promoCode={promoCode}
                    selectedDate={selectedDate}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}