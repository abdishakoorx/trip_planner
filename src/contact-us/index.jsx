import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Facebook, Code, } from "lucide-react"
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { ContactForm } from "./components/ContactForm"
import { ContactInfo } from "./components/ContactInfo"
import { ContactFAQ } from "./components/ContactFAQ"
import Newsletter from "@/components/custom/Newsletter"

function ContactUs() {
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        // Here you would typically handle the form submission with your backend
        // For now, we'll just simulate a successful submission
        setFormSubmitted(true)
        toast.success("Thank you for the feedback", {
            description: 'Your message has been sent successfully!'
        })
        setTimeout(() => {
            setFormSubmitted(false)
        }, 5000)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Gradient Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 z-0 h-[320px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-slate-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 mix-blend-overlay"></div>
                </div>
                <div className="relative z-10 pt-32 pb-4">
                    <div className="container max-w-5xl px-4 mx-auto">
                        <div className="mb-8 text-center">
                            <h1 className="mb-4 font-serif text-4xl font-semibold md:text-5xl text-primary">Get in Touch</h1>
                            <p className="max-w-2xl mx-auto text-lg text-primary/80">
                                We&apos;d love to hear from you! Whether you have a question about our services, need help planning your
                                trip, or want to share your travel experiences, we&apos;re here to help.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Cards */}
            <div className="container max-w-6xl px-4 mx-auto mt-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Email Card */}
                    <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6 text-center">
                                <div className="flex items-center justify-center w-16 h-16 mb-4 text-blue-600 bg-blue-100 rounded-full">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Email Us</h3>
                                <p className="mb-4 text-gray-600">Our friendly team is here to help</p>
                                <Link to="mailto:abdishakoor145@gmail.com" className="text-blue-600 transition-colors hover:text-blue-800">
                                    abdishakoor145@gmail.com
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Phone Card */}
                    <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6 text-center">
                                <div className="flex items-center justify-center w-16 h-16 mb-4 text-green-600 bg-green-100 rounded-full">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">Call Us</h3>
                                <p className="mb-4 text-gray-600">Mon-Fri from 8am to 5pm</p>
                                <Link to="tel:+254722280781" className="text-green-600 hover:underline">
                                    +254 722 280781
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Portfolio Card */}
                    <Card className="overflow-hidden transition-all duration-300 border-none shadow-lg hover:shadow-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6 text-center">
                                <div className="flex items-center justify-center w-16 h-16 mb-4 text-blue-600 bg-blue-100 rounded-full">
                                    <Code className="w-8 h-8" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">My Portfolio</h3>
                                <p className="mb-4 text-gray-600">Check out my other projects</p>
                                <Link
                                    to="https://abdishakoorx.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Visit Portfolio
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content */}
            <div className="container max-w-6xl px-4 py-16 mx-auto">
                <Tabs defaultValue="contact-form" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto mb-8">
                        <TabsTrigger value="contact-form">Contact Form</TabsTrigger>
                        <TabsTrigger value="contact-info">Contact Info</TabsTrigger>
                        <TabsTrigger value="faq">FAQ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="contact-form">
                        <ContactForm onSubmit={handleFormSubmit} formSubmitted={formSubmitted} />
                    </TabsContent>

                    <TabsContent value="contact-info">
                        <ContactInfo />
                    </TabsContent>

                    <TabsContent value="faq">
                        <ContactFAQ />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Social Media Section */}
            <div className="py-16 bg-gray-50">
                <div className="container max-w-6xl px-4 mx-auto">
                    <div className="text-center">
                        <h2 className="mb-6 text-3xl font-semibold text-gray-900">Connect With Us</h2>
                        <p className="max-w-2xl mx-auto mb-8 text-gray-600">
                            Follow us on social media for travel inspiration, tips, and updates on our latest offers
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Link
                                to="#"
                                className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-blue-600 rounded-full hover:scale-110"
                            >
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-pink-600 rounded-full hover:scale-110"
                            >
                                <InstagramLogoIcon className="w-6 h-6" />
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-blue-400 rounded-full hover:scale-110"
                            >
                                <TwitterLogoIcon className="w-6 h-6" />
                            </Link>
                            <Link
                                to="#"
                                className="flex items-center justify-center w-12 h-12 text-white transition-transform bg-blue-700 rounded-full hover:scale-110"
                            >
                                <LinkedInLogoIcon className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <Newsletter />
        </div>
    )
}

export default ContactUs