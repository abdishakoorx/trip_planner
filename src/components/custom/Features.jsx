import React from 'react';
import { Sparkles, Compass, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
    const features = [
        {
            id: 1,
            icon: <Sparkles className="w-10 h-10 text-accent" />,
            title: "AI-Powered Recommendations",
            description: "Our advanced AI analyzes thousands of destinations to find the perfect match for your travel preferences and budget.",
        },
        {
            id: 2,
            icon: <Compass className="w-10 h-10 text-secondary" />,
            title: "Custom Itineraries",
            description: "Get personalized day-by-day plans complete with activities, restaurants, and hidden gems only locals know about.",
        },
        {
            id: 3,
            icon: <Calendar className="w-10 h-10 text-primary" />,
            title: "Smart Scheduling",
            description: "We optimize your travel schedule based on location, opening hours, and crowd predictions for a seamless experience.",
        },
        {
            id: 4,
            icon: <MapPin className="w-10 h-10 text-destructive" />,
            title: "Real-time Updates",
            description: "Receive instant notifications about weather changes, attraction closures, or better alternatives during your trip.",
        },
    ];

    return (
        <section id="features" className="py-16 md:py-24">
            <div className="container px-4 mx-auto">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-primary">Experience Travel Planning, <span className="text-accent">Reimagined</span></h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Greatertrips combines cutting-edge AI technology with travel expertise to create unforgettable journeys tailored just for you.
                    </p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="relative p-6 overflow-hidden bg-white shadow-md rounded-xl hover-card group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-transform bg-gray-100 rounded-full group-hover:scale-110"></div>
                            <div className="relative z-10">
                                {feature.icon}
                                <h3 className="mt-5 mb-3 text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Card */}
                <div className="relative p-8 mt-20 overflow-hidden shadow-xl bg-primary rounded-2xl md:p-12 text-primary-foreground">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 rounded-full w-80 h-80 bg-accent/10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 -mb-16 -ml-16 rounded-full bg-secondary/10"></div>

                    <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div>
                            <h3 className="mb-4 font-serif text-2xl font-bold md:text-3xl">Ready to plan your next adventure?</h3>
                            <p className="max-w-xl text-primary-foreground/80">
                                Let our AI assistant help you create the perfect itinerary based on your preferences, budget, and travel style.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link to='/create-trip'>
                                <Button variant={'link'} className="text-base underline text-accent-foreground whitespace-nowrap">
                                    Start Planning
                                </Button>
                            </Link>
                            <Link to="/about-us">
                                <Button className="px-6 py-3 font-medium transition-all bg-transparent border rounded-md border-primary-foreground text-primary-foreground hover:bg-white/10 whitespace-nowrap">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;