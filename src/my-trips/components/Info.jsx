/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Info as InfoIcon } from "lucide-react"

function Info({ trip }) {
    if (!trip) {
        return (
            <div className="flex items-center justify-center h-[360px]">
                <p className="text-gray-600">Loading trip information...</p>
            </div>
        );
    }

    const userSelection = trip?.userSelection || {};
    const basics = trip?.tripInfo?.destination?.basics || {};
    const tips = basics?.tips || [];

    return (
        <div>
            <img src="/travel.jpg" alt="Map" className="h-[360px] w-full object-cover rounded-md" />

            <div className="flex flex-col gap-2 mt-3 md:justify-between md:flex-row">
                <h2 className="text-xl font-semibold text-gray-900">
                    {userSelection.destination}
                </h2>
                <div className="flex flex-wrap items-center gap-4 ">
                    {userSelection.days && (
                        <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                            <span className="text-xs font-medium text-gray-100">{userSelection.days} Days</span>
                        </Badge>
                    )}
                    {userSelection.tripType && (
                        <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                            <span className="text-xs font-medium text-gray-100">{userSelection.tripType}</span>
                        </Badge>
                    )}
                    {userSelection.size && (
                        <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                            <span className="text-xs font-medium text-gray-100">{userSelection.size}</span>
                        </Badge>
                    )}
                    {userSelection.budget && (
                        <Badge variant="secondary" className="px-3 rounded-full bg-accent hover:bg-accent/90">
                            <span className="text-xs font-medium text-gray-100">{userSelection.budget}</span>
                        </Badge>
                    )}
                </div>
            </div>

            {/* Destination Basics Section */}
            <div className="mt-8 rounded-2xl">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Currency Card */}
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-gray-900">Currency</span>
                        </div>
                        <p className="text-gray-600">{basics.currency}</p>
                    </div>

                    {/* Language Card */}
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <span className="font-medium text-gray-900">Languages</span>
                        </div>
                        <p className="text-gray-600">{basics.language}</p>
                    </div>

                    {/* Best Time Card */}
                    <div className="p-3 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span className="font-medium text-gray-900">Best Time to Visit</span>
                        </div>
                        <p className="text-gray-600">{basics.bestTime}</p>
                    </div>
                </div>

                {/* Travel Tips Section */}
                {tips.length > 0 && (
                    <div className="mt-8">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Travel Tips</h4>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="tips">
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-3 text-secondary">
                                        <InfoIcon className="flex-shrink-0 w-5 h-5" />
                                        <span className="text-left">Essential Travel Tips</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-3">
                                        {tips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="flex-shrink-0 text-gray-600">•</span>
                                                <span className="text-gray-600">{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Info;