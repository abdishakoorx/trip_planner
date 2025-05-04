import React from 'react';
import { Button } from '../ui/button';

const Newsletter = () => {
    return (
        <section className="relative py-16 overflow-hidden md:py-24 bg-gray-50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 rounded-full bg-secondary/5"></div>
            <div className="absolute bottom-0 right-0 -mb-40 -mr-40 rounded-full w-80 h-80 bg-accent/5"></div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-primary">Travel Inspiration in Your Inbox</h2>
                    <p className="mb-8 text-gray-600">
                        Subscribe to receive personalized destination ideas, travel tips, and exclusive AI-powered insights for your next adventure.
                    </p>

                    {/* Subscription form */}
                    <div className="flex flex-col items-center max-w-lg gap-3 mx-auto sm:flex-row">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow h-10 px-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button className="h-10 px-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                            Subscribe
                        </Button>
                    </div>

                    {/* Privacy note */}
                    <p className="mt-4 text-sm text-gray-500">
                        We respect your privacy. Unsubscribe at any time.
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-3">
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                    <span className="text-xl font-bold text-primary">1</span>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-medium">Weekly Inspiration</h3>
                            <p className="text-sm text-gray-600">
                                Curated destination ideas based on your preferences and travel history.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10">
                                    <span className="text-xl font-bold text-secondary">2</span>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-medium">Travel Deals</h3>
                            <p className="text-sm text-gray-600">
                                Exclusive offers and promotions from our trusted travel partners.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-md">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
                                    <span className="text-xl font-bold text-accent">3</span>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-medium">AI Travel Tips</h3>
                            <p className="text-sm text-gray-600">
                                Personalized recommendations and insights for your upcoming trips.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;