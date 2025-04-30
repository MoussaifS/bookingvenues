'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation' // Import useRouter for redirection
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Zod schema remains the same
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  notes: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export function BookingForm({
  venueId,
  promoCode,
  selectedDate,
  pricePerHour // Pass pricePerHour if needed for display or logic later
}: {
  venueId: string
  promoCode?: string
  selectedDate?: Date
  pricePerHour?: number // Added optional price
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter() // Initialize the router

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
      terms: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if a date is selected before submitting
    if (!selectedDate) {
       // Optionally use toast for user feedback
       // toast({ title: "Please select a date", variant: "destructive" });
       alert("Please select a date before booking."); // Simple alert fallback
       return; // Stop submission
    }

    setIsSubmitting(true); // Start submitting state

    try {
      // Step 1: Attempt to create or find the customer
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phoneNumber: values.phone,
          notes: values.notes || '',
          // Send data needed by the customer endpoint
          // promoCode: promoCode, // Only if customer endpoint handles it
          // bookingDate: selectedDate?.toISOString(),
          // venueId: venueId
        }),
      });

      // Check if customer creation failed (network or server error)
      // Note: We are NOT parsing specific error messages here per the request
      if (!customerResponse.ok) {
          // Throw a generic error to trigger the catch block
          throw new Error(`Customer API failed with status: ${customerResponse.status}`);
      }

      const customerData = await customerResponse.json();
      const userId = customerData?.userId; // Adjust based on your API response structure

      // Ensure we got a customer ID back
      if (!userId) {
          throw new Error("Failed to retrieve customer ID from API response.");
      }

      // Step 2: Attempt to create the booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Strapi typically expects data nested under 'data'
          data: {
            customer: userId, // Link to the customer ID
            venue: venueId, // Link to the venue ID
            notes: values.notes || '', // Include notes
            status: 'pending', // Set initial status
            bookingDate: selectedDate.toISOString(), // Use confirmed selectedDate
            // Add other fields your booking endpoint expects
            // appliedPromoCode: promoCode,
            // finalPrice: discountedPrice // If price calculation happens backend
          }
        }),
      });

      // Check if booking creation failed
      if (!bookingResponse.ok) {
          throw new Error(`Booking API failed with status: ${bookingResponse.status}`);
      }

      // --- Success ---
      console.log("Booking submitted successfully!"); // Log success for debugging
      // Optionally show a success message to the user
      // toast({ title: "Booking Request Submitted!", description: "We'll be in touch soon." });

      form.reset(); // Reset form fields
      // Optionally close the dialog after success
      // You might need to manage the Dialog's open state from the parent component
      // or use a ref if keeping it self-contained.

    } catch (error) {
      // --- Failure ---
      console.error('Booking submission error:', error); // Log the error for debugging

      // Redirect to contact page on ANY error during the try block
      router.push('/contact');

    } finally {
      // Ensure the submitting state is turned off whether success or failure
      setIsSubmitting(false);
    }
  }


  return (
    // Dialog and Form structure remains largely the same
    <Dialog>
      <DialogTrigger asChild>
        {/* Disable trigger button if no date is selected */}
        <Button className="w-full" disabled={!selectedDate}>
            {selectedDate ? "Request Booking" : "Select a Date First"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Booking Request</DialogTitle>
          <div>
            Fill in your details below. We'll confirm availability and payment afterwards.
          </div>
        </DialogHeader>
        {/* Display selected date prominently */}
        {selectedDate && (
            <div className="text-sm font-medium p-2 bg-secondary rounded-md text-center">
                Booking for: {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* FormField for name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField for email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField for phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Best contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField for notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requirements, e.g., setup time, specific equipment needed..."
                      className="resize-none" // prevent resizing
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* FormField for terms */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms" // Add id for label association
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms" className="cursor-pointer"> {/* Associate label */}
                      I agree to the terms and conditions
                    </FormLabel>
                    <FormDescription>
                      {/* You could link to actual terms here */}
                      Review our booking terms and policies before proceeding.
                    </FormDescription>
                  </div>
                  <FormMessage className="mt-0!" /> {/* Adjust message positioning if needed */}
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !selectedDate} // Also disable if no date
            >
              {isSubmitting ? "Processing..." : "Submit Booking Request"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}