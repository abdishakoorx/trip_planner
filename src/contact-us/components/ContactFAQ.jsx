import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link } from "react-router-dom"

export function ContactFAQ() {
    const faqs = [
        {
            question: "How do I book a trip through GreaterTrips?",
            answer:
                "Booking a trip through GreaterTrips is easy! Simply create an account, browse our available destinations, select your preferred dates and options, and follow the checkout process. If you need assistance, our customer service team is available to help you through the process.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. For certain destinations, we also offer payment plans to help you spread the cost of your trip.",
        },
        {
            question: "Can I modify or cancel my booking?",
            answer:
                "Yes, you can modify or cancel your booking through your account dashboard. Please note that modification and cancellation policies vary depending on the trip and how close you are to the departure date. We recommend reviewing the specific terms for your booking.",
        },
        {
            question: "Do you offer travel insurance?",
            answer:
                "Yes, we offer comprehensive travel insurance options to protect your trip investment. Our insurance packages typically cover trip cancellation, medical emergencies, lost luggage, and travel delays. You can add insurance during the booking process.",
        },
        {
            question: "How far in advance should I book my trip?",
            answer:
                "We recommend booking at least 3-6 months in advance for popular destinations, especially if you're traveling during peak season. This ensures you get the best availability and rates. However, we also offer last-minute deals for spontaneous travelers!",
        },
        {
            question: "Do you offer group discounts?",
            answer:
                "Yes! We offer special rates for groups of 6 or more travelers. Please contact our group booking department at groups@greatertrips.com for a custom quote and to discuss your specific requirements.",
        },
        {
            question: "What should I do if I encounter issues during my trip?",
            answer:
                "We provide 24/7 emergency support for all our travelers. If you encounter any issues during your trip, please contact our emergency support line at the number provided in your booking confirmation. Our local representatives are also available to assist you at your destination.",
        },
        {
            question: "Do you offer customized itineraries?",
            answer:
                "We specialize in creating personalized travel experiences. Contact our travel consultants to discuss your preferences, interests, and budget, and we'll craft a custom itinerary just for you.",
        },
    ]

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
                <h2 className="mb-4 text-3xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                    Find answers to common questions about our services. If you can&apos;t find what you&apos;re looking for, please don&apos;t
                    hesitate to contact us directly.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                        <AccordionTrigger className="py-4 text-left text-gray-900 hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="p-6 mt-10 text-center bg-gray-50 rounded-xl">
                <h3 className="mb-2 text-xl font-medium text-gray-900">Still have questions?</h3>
                <p className="mb-4 text-gray-600">
                    If you couldn&apos;t find the answer to your question, please don&apos;t hesitate to reach out to us directly.
                </p>
                <Link
                    to="mailto:abdishakoor145@gmail.com"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    Contact Our Support Team
                </Link>
            </div>
        </div>
    )
}
