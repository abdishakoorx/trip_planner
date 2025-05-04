import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Destinations = () => {
    const scrollContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [autoplayActive, setAutoplayActive] = useState(true);
    const autoplayTimeoutRef = useRef(null);
    const visibleDotsCount = 4; // Show only 4 dots at a time

    const destinations = [
        {
            id: 1,
            name: "Amalfi Coast",
            location: "Italy",
            rating: 4.9,
            reviewCount: 267,
            image: "https://images.unsplash.com/photo-1533656338503-b22f63e96cd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1hbGZpJTIwY29hc3QlMjBpdGFseXxlbnwwfHwwfHx8MA%3D%3D",
            description: "Azure waters, cliffside villages, and Mediterranean charm."
        },
        {
            id: 2,
            name: "Kyoto",
            location: "Japan",
            rating: 4.8,
            reviewCount: 352,
            image: "https://images.unsplash.com/photo-1588000316012-ae41e1c9db1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a3lvdCUyMGphcGFufGVufDB8fDB8fHww",
            description: "Traditional temples, serene gardens, and autumn colors."
        },
        {
            id: 3,
            name: "Santorini",
            location: "Greece",
            rating: 4.9,
            reviewCount: 423,
            image: "https://plus.unsplash.com/premium_photo-1661963643348-e95c6387ee8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pJTIwZ3JlZWNlfGVufDB8fDB8fHww",
            description: "Whitewashed buildings, blue domes, and breathtaking sunsets."
        },
        {
            id: 4,
            name: "Bali",
            location: "Indonesia",
            rating: 4.7,
            reviewCount: 518,
            image: "https://images.unsplash.com/photo-1648999496322-da07fa6a7d27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGJhbGklMjBpbmRvbmVzaWF8ZW58MHx8MHx8fDA%3D",
            description: "Tropical paradise with lush rice terraces and vibrant culture."
        },
        {
            id: 5,
            name: "Machu Picchu",
            location: "Peru",
            rating: 4.9,
            reviewCount: 487,
            image: "https://images.unsplash.com/photo-1543385426-191664295b58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2h1JTIwcGljaHV8ZW58MHx8MHx8fDA%3D",
            description: "Ancient Incan citadel set against breathtaking mountain scenery."
        },
        {
            id: 6,
            name: "Marrakech",
            location: "Morocco",
            rating: 4.7,
            reviewCount: 356,
            image: "https://images.unsplash.com/photo-1672842056361-1838711c5aeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fG1hcnJha2VjaHxlbnwwfDB8MHx8fDA%3D",
            description: "Vibrant markets, historic medinas, and stunning Moorish architecture."
        },
        {
            id: 7,
            name: "Vietnam",
            location: "Hoi An",
            rating: 4.8,
            reviewCount: 341,
            image: "https://images.unsplash.com/photo-1558334466-afce6bf36c69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9pJTIwQW4lMjB2aWV0bmFtfGVufDB8MHwwfHx8MA%3D%3D",
            description: "Lantern-lit streets, riverside markets, and heritage charm."
        },
    ];

    // Calculate visible dot range
    const getVisibleDotRange = () => {
        let startDot = Math.max(0, activeIndex - Math.floor(visibleDotsCount / 2));
        let endDot = startDot + visibleDotsCount - 1;

        // Adjust if out of bounds
        if (endDot >= destinations.length) {
            endDot = destinations.length - 1;
            startDot = Math.max(0, endDot - visibleDotsCount + 1);
        }

        return { startDot, endDot };
    };

    const { startDot, endDot } = getVisibleDotRange();

    useEffect(() => {
        const updateScrollMetrics = () => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const totalWidth = container.scrollWidth;
                const visibleWidth = container.clientWidth;

                setMaxScroll(totalWidth - visibleWidth);
                setTotalPages(destinations.length);
            }
        };

        updateScrollMetrics();
        window.addEventListener('resize', updateScrollMetrics);

        return () => window.removeEventListener('resize', updateScrollMetrics);
    }, [destinations.length]);

    useEffect(() => {
        if (autoplayActive) {
            // Clear any existing timeout
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }

            // Set new timeout
            autoplayTimeoutRef.current = setTimeout(() => {
                const nextIndex = (activeIndex + 1) % destinations.length;
                scrollToIndex(nextIndex);
            }, 5000); // Change slides every 5 seconds
        }

        return () => {
            if (autoplayTimeoutRef.current) {
                clearTimeout(autoplayTimeoutRef.current);
            }
        };
    }, [activeIndex, autoplayActive, destinations.length]);

    // Reset autoplay when user interacts
    const handleUserInteraction = () => {
        if (autoplayTimeoutRef.current) {
            clearTimeout(autoplayTimeoutRef.current);
        }
        setAutoplayActive(true); // Restart autoplay
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const currentScroll = container.scrollLeft;
            setScrollPosition(currentScroll);

            // Detect which item is most visible
            const itemWidth = container.firstChild?.clientWidth || 1;
            const newActiveIndex = Math.round(currentScroll / itemWidth);

            if (newActiveIndex !== activeIndex && newActiveIndex >= 0 && newActiveIndex < destinations.length) {
                setActiveIndex(newActiveIndex);
            }
        }
    };

    const scrollToIndex = (index) => {
        if (scrollContainerRef.current && index >= 0 && index < destinations.length) {
            const container = scrollContainerRef.current;
            const itemWidth = container.firstChild?.clientWidth || 0;
            const scrollAmount = index * itemWidth;

            container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    const scrollPrev = () => {
        handleUserInteraction();
        const prevIndex = (activeIndex - 1 + destinations.length) % destinations.length;
        scrollToIndex(prevIndex);
    };

    const scrollNext = () => {
        handleUserInteraction();
        const nextIndex = (activeIndex + 1) % destinations.length;
        scrollToIndex(nextIndex);
    };

    // Pause autoplay when hovering over container
    const handleMouseEnter = () => setAutoplayActive(false);
    const handleMouseLeave = () => setAutoplayActive(true);

    return (
        <section id="destinations" className="py-16 md:py-24">
            <div className="container px-4 mx-auto">
                {/* Section header */}
                <div className="flex flex-col items-start justify-between mb-12 md:flex-row md:items-end">
                    <div>
                        <h2 className="mb-4 font-serif text-3xl font-bold md:text-4xl text-primary">Popular Destinations</h2>
                        <p className="max-w-2xl text-gray-600">
                            Discover trending locations loved by travelers worldwide. Each personally vetted by our AI for exceptional experiences.
                        </p>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center mt-4 space-x-4 md:mt-0">
                        <Button
                            onClick={scrollPrev}
                            className="flex items-center justify-center w-10 h-10 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                        <Button
                            onClick={scrollNext}
                            className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-primary hover:bg-primary/90"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </Button>
                    </div>
                </div>

                {/* Destinations scrollable container */}
                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-8 pb-8 overflow-x-auto scrollbar-hide snap-x"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {destinations.map((destination, index) => (
                            <div
                                key={destination.id}
                                className={`relative flex-shrink-0 w-full overflow-hidden shadow-md sm:w-1/2 lg:w-1/4 group rounded-xl hover-card snap-start transition-all duration-300 ${activeIndex === index ? 'scale-95' : ''
                                    }`}
                            >
                                {/* Image with gradient overlay */}
                                <div className="relative h-64">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Rating */}
                                    <div className="absolute z-20 flex items-center px-3 py-1 rounded-full top-4 right-4 bg-white/90 backdrop-blur-sm">
                                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium">{destination.rating}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                                            <div className="flex items-center mt-1 text-sm text-white/80">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                <span>{destination.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm transition-opacity opacity-0 text-white/90 group-hover:opacity-100">
                                        {destination.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modern Instagram-style indicators */}
                    <div className="flex items-center justify-center mt-6 space-x-2 overflow-hidden">
                        {destinations.slice(startDot, endDot + 1).map((_, idx) => {
                            const actualIndex = startDot + idx;
                            return (
                                <button
                                    key={actualIndex}
                                    onClick={() => {
                                        handleUserInteraction();
                                        scrollToIndex(actualIndex);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === actualIndex
                                        ? 'bg-primary w-8'
                                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to slide ${actualIndex + 1}`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* "View all" link */}
                <div className="flex justify-center mt-12">
                    <Link to='/history'>
                        <Button variant={'link'} className='text-base text-accent'>
                            View all destinations
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Destinations;