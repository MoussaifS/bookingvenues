'use client'

import { useState, useMemo } from 'react'
import { Share2, MapPin, Mail, Copy, Check, Globe2, Linkedin, X, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { EventDemo } from '@/types/event'

interface Props { event: EventDemo; trigger?: React.ReactNode }
interface ContactFormValues { name: string; email: string; message: string }

export function EventDetailsDialog({ event, trigger }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const form = useForm<ContactFormValues>({ defaultValues: { name: '', email: '', message: '' } })

  const eventUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/calendar?event=${event.id}`
  }, [event.id])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copied')
    } catch {
      toast.error('Copy failed')
    }
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text: event.description, url: eventUrl })
        toast('Shared')
      } catch (e: unknown) {
        if (typeof e === 'object' && e && 'name' in e && (e as { name?: string }).name === 'AbortError') return
        toast.error('Share cancelled')
      }
    } else {
      handleCopy()
    }
  }

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/event-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, eventId: event.id })
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Failed')
      toast.success('Message sent to organizer')
      form.reset()
    } catch (err: unknown) {
      const msg = typeof err === 'object' && err && 'message' in err ? String((err as { message?: string }).message) : 'Error sending message'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const mapSrc = event.latitude && event.longitude
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${event.longitude-0.01}%2C${event.latitude-0.01}%2C${event.longitude+0.01}%2C${event.latitude+0.01}&layer=mapnik&marker=${event.latitude}%2C${event.longitude}`
    : undefined

  const socialText = encodeURIComponent(`${event.title} — ${event.description}`.slice(0,250))
  const encodedUrl = encodeURIComponent(eventUrl)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline" size="sm">View Details</Button>}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>{event.date} • {event.time} • {event.venue}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 text-sm">
          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h4>
            {event.address && <p>{event.address}</p>}
            {mapSrc ? (
              <div className="aspect-video w-full overflow-hidden rounded-md border">
                <iframe title="Event map" src={mapSrc} className="w-full h-full" />
              </div>
            ) : (
              <p className="text-muted-foreground text-xs">Map coming soon.</p>
            )}
          </section>
          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={handleWebShare}><Share2 className="w-4 h-4" /> System Share</Button>
              <Button variant="secondary" size="sm" onClick={handleCopy}>{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy Link</Button>
              <Button asChild variant="secondary" size="sm"><a href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${socialText}`} target="_blank" rel="noopener noreferrer">X</a></Button>
              <Button asChild variant="secondary" size="sm"><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></a></Button>
            </div>
          </section>
          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2"><Mail className="w-4 h-4" /> Contact Organizer</h4>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField name="name" control={form.control} rules={{ required: 'Name required' }} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="email" control={form.control} rules={{ required: 'Email required' }} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField name="message" control={form.control} rules={{ required: 'Message required' }} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl><Textarea rows={4} placeholder={`Hello ${event.managerName || 'organizer'}, I would like to ask about...`} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-muted-foreground">Goes directly to the organizer. No spam.</p>
                  <Button type="submit" size="sm" disabled={submitting}>{submitting && <Loader2 className="w-4 h-4 animate-spin" />} Send</Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
        <DialogFooter className="pt-4">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}><X className="w-4 h-4" /> Close</Button>
          <Button asChild size="sm" variant="outline"><a href={eventUrl} target="_blank" rel="noopener noreferrer"><Globe2 className="w-4 h-4" /> Public Link</a></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
