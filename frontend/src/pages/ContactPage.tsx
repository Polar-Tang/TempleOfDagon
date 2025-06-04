import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { ArrowLeft, CheckCircle } from "lucide-react"
import SecondNavbar from "@/components/SecondNavbar"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    feedback: "",
    category: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const isFormValid = formData.feedback.trim() && formData.category && formData.email.trim()

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-black text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">Thanks for your submission!</h2>
            <p className="text-gray-600 mb-6">We appreciate your feedback and will review it carefully.</p>
            <div className="space-y-3">
              <Button asChild className="w-full bg-black hover:bg-gray-800 text-white">
                <Link to="/questionarie">Back to Questionnaire</Link>
              </Button>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ feedback: "", category: "", email: "" })
                }}
                variant="outline"
                className="w-full border-black text-black hover:bg-gray-100"
              >
                Submit Another Response
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SecondNavbar>


    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-black">
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-black hover:bg-gray-100">
              <Link to="/questionarie">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Do our questionarie
              </Link>
            </Button>
          </div>
          <CardTitle className="text-black text-xl">Contact us</CardTitle>
          <CardDescription className="text-gray-600">
            Select an specific topic and provide us your email
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            

            <div className="space-y-2">
              <Label htmlFor="category" className="text-black font-medium">
                We offer you:
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
              >
                <SelectTrigger className="border-gray-300 focus:border-black">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Soul sacrifice</SelectItem>
                  <SelectItem value="questions">Gain power</SelectItem>
                  <SelectItem value="results">Another services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-gray-300 focus:border-black"
                required
              />
              <p className="text-sm text-gray-500">We'll only use this to follow up if needed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-black font-medium">
                Want you want of us?
              </Label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you thought about the questionnaire, suggestions for improvement, or any other comments..."
                value={formData.feedback}
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-black"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </SecondNavbar>
  )
}
