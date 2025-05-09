/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ContactForm({ onSubmit, formSubmitted }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h2 className="mb-6 text-3xl font-semibold text-gray-900">Send Us a Message</h2>
        <p className="mb-4 text-gray-600">
          Have a question or need assistance with planning your trip? Fill out the form and our team will get back to
          you as soon as possible.
        </p>
        <div className="p-6 bg-blue-50 rounded-xl">
          <h3 className="mb-4 text-lg font-medium text-gray-900">What to expect</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
              <span>We typically respond within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
              <span>Your information is kept confidential</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="flex-shrink-0 w-5 h-5 mt-0.5 text-green-500" />
              <span>Our team is available 7 days a week</span>
            </li>
          </ul>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-6">
          {formSubmitted ? (
            <Alert className="text-green-800 border-green-200 bg-green-50">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your message has been sent successfully. We&apos;ll get back to you soon!
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select onValueChange={handleSelectChange} value={formData.subject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="booking">Booking Assistance</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
