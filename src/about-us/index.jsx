import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Calendar, Clock, Award, MessageCircle, Star, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 10
        }
    }
};

const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
};

const AboutUs = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="pt-32 pb-20 text-white bg-gradient-to-b from-primary to-primary/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container px-4 mx-auto">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl text-shadow">
                            AboutUs Greatertrips
                        </h1>
                        <p className="mb-8 text-xl md:text-2xl opacity-90">
                            The smart travel companion powered by AI to create unforgettable journeys
                        </p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-3"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-sm backdrop-blur-sm"
                                variants={fadeIn}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Compass className="w-4 h-4 mr-2" />
                                Smart Itineraries
                            </motion.span>
                            <motion.span
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-sm backdrop-blur-sm"
                                variants={fadeIn}
                                whileHover={{ scale: 1.05 }}
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                Global Destinations
                            </motion.span>
                            <motion.span
                                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-sm backdrop-blur-sm"
                                variants={fadeIn}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Personalized Planning
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Our Mission */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl text-primary">Our Mission</h2>
                            <p className="mb-6 leading-relaxed text-gray-700">
                                At Greatertrips, we believe that every journey has the potential to transform us. Our mission is to harness the power of
                                artificial intelligence to create travel experiences that are not just trips, but journeys of discovery and connection.
                            </p>
                            <p className="mb-6 leading-relaxed text-gray-700">
                                We're dedicated to making travel planning effortless and inspiring, giving you more time to focus on what truly matters –
                                creating memories that last a lifetime. Our AI-powered platform learns from your preferences and adapts to craft the
                                perfect itinerary tailored specifically to you.
                            </p>
                            <div className="flex items-center">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={iconAnimation}
                                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                                >
                                    <div className="flex items-center justify-center rounded-full h-14 w-14 bg-secondary">
                                        <Compass className="h-7 w-7 text-secondary-foreground" />
                                    </div>
                                </motion.div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-primary">Discover Your Path</h4>
                                    <p className="text-sm text-gray-600">Personalized journeys, unique experiences</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="overflow-hidden rounded-lg shadow-xl">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1675629118402-902d7dabda23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1vdW50YWlufGVufDB8MHwwfHx8MA%3D%3D"
                                    alt="Scenic mountain view"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <motion.div
                                className="absolute p-4 rounded-lg shadow-lg -bottom-6 -left-6 bg-accent"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            >
                                <p className="font-serif italic text-accent-foreground">
                                    "Not all who wander are lost, but all who use Greatertrips are found."
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Sets Us Apart */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-12 font-serif text-3xl font-bold text-center md:text-4xl text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        What Sets Us Apart
                    </motion.h2>

                    <motion.div
                        className="grid gap-8 md:grid-cols-3"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-primary/10"
                                variants={iconAnimation}
                                whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                            >
                                <Clock className="w-6 h-6 text-primary" />
                            </motion.div>
                            <h3 className="mb-3 text-xl font-semibold text-primary">Time-Saving AI</h3>
                            <p className="text-gray-600">
                                Our advanced algorithms create personalized itineraries in seconds, saving you hours of research and planning.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-secondary/10"
                                variants={iconAnimation}
                                whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                            >
                                <Award className="w-6 h-6 text-secondary" />
                            </motion.div>
                            <h3 className="mb-3 text-xl font-semibold text-primary">Expert Curation</h3>
                            <p className="text-gray-600">
                                We combine AI with insights from seasoned travelers to recommend authentic and unique experiences.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white rounded-lg shadow-md"
                            variants={fadeIn}
                            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-accent/10"
                                variants={iconAnimation}
                                whileHover={{ rotate: 360, transition: { duration: 0.7 } }}
                            >
                                <MessageCircle className="w-6 h-6 text-accent" />
                            </motion.div>
                            <h3 className="mb-3 text-xl font-semibold text-primary">Personalized Service</h3>
                            <p className="text-gray-600">
                                Our AI travel assistant is available 24/7 to answer questions and make adjustments to your itinerary.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Core Values */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <motion.h2
                        className="mb-12 font-serif text-3xl font-bold text-center md:text-4xl text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Our Core Values
                    </motion.h2>

                    <motion.div
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10"
                                variants={iconAnimation}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <Users className="w-8 h-8 text-primary" />
                            </motion.div>
                            <h3 className="mb-2 text-lg font-semibold">Community</h3>
                            <p className="text-sm text-gray-600">
                                We believe in the power of connection and shared experiences.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10"
                                variants={iconAnimation}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <Compass className="w-8 h-8 text-secondary" />
                            </motion.div>
                            <h3 className="mb-2 text-lg font-semibold">Exploration</h3>
                            <p className="text-sm text-gray-600">
                                We encourage curiosity and venturing beyond the familiar.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10"
                                variants={iconAnimation}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <Star className="w-8 h-8 text-accent" />
                            </motion.div>
                            <h3 className="mb-2 text-lg font-semibold">Excellence</h3>
                            <p className="text-sm text-gray-600">
                                We're committed to providing the highest quality travel recommendations.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10"
                                variants={iconAnimation}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <MapPin className="w-8 h-8 text-destructive" />
                            </motion.div>
                            <h3 className="mb-2 text-lg font-semibold">Authenticity</h3>
                            <p className="text-sm text-gray-600">
                                We value genuine experiences that reflect the true character of destinations.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-20 bg-gray-50">
                <div className="container max-w-5xl px-4 mx-auto">
                    <motion.h2
                        className="mb-16 font-serif text-3xl font-bold text-center md:text-4xl text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Meet the Creator
                    </motion.h2>

                    <motion.div
                        className="flex flex-col items-center gap-10 overflow-hidden bg-white shadow-lg md:flex-row md:items-start rounded-xl"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 w-full h-64 md:w-1/2 md:h-auto"
                        >
                            <img
                                src="founder.jpg"
                                alt="Portrait of Abdishakoor Hassan"
                                className="object-cover w-full h-full"
                            />
                        </motion.div>

                        <div className="p-8 space-y-4 text-center md:p-10 md:text-left">
                            <h3 className="text-2xl font-semibold text-primary">Abdishakoor Hassan</h3>
                            <p className="text-sm font-medium uppercase text-accent">Software Engineer</p>
                            <p className="text-sm leading-relaxed text-gray-600">
                                I’m a software engineer with 4 years of experience in building web applications. I graduated from Kenyatta University and have a strong passion for solving real-world problems through clean and efficient code.
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600">
                                This project is a personal initiative I designed and developed independently. It reflects my interest in travel tech, UI/UX, and full-stack development — from concept to deployment.
                            </p>
                            <p className="text-sm leading-relaxed text-gray-600">
                                I’m always looking to grow, collaborate, and build meaningful software experiences.
                            </p>

                            <div className="flex justify-center gap-4 pt-4 md:justify-start">
                                <a
                                    href="https://www.linkedin.com/in/abdishakoorx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium text-white transition rounded bg-primary hover:bg-primary/90"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://abdishakoorx.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium transition border rounded text-primary border-primary hover:bg-primary hover:text-white"
                                >
                                    Portfolio
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>




            {/* Stats Section */}
            <motion.section
                className="py-20 bg-primary text-primary-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="container px-4 mx-auto">
                    <motion.div
                        className="grid grid-cols-2 gap-8 md:grid-cols-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                        >
                            <motion.h3
                                className="mb-2 text-4xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.5 }}
                                    viewport={{ once: true }}
                                >
                                    50K+
                                </motion.span>
                            </motion.h3>
                            <p className="text-primary-foreground/80">Happy Travelers</p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                        >
                            <motion.h3
                                className="mb-2 text-4xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    120+
                                </motion.span>
                            </motion.h3>
                            <p className="text-primary-foreground/80">Countries Covered</p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                        >
                            <motion.h3
                                className="mb-2 text-4xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    99%
                                </motion.span>
                            </motion.h3>
                            <p className="text-primary-foreground/80">Satisfaction Rate</p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                        >
                            <motion.h3
                                className="mb-2 text-4xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    24/7
                                </motion.span>
                            </motion.h3>
                            <p className="text-primary-foreground/80">AI Support</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <motion.div
                        className="p-8 text-center text-white bg-gradient-to-r from-primary to-accent rounded-2xl md:p-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="mb-6 font-serif text-3xl font-bold md:text-4xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Ready to Plan Your Next Adventure?
                        </motion.h2>
                        <motion.p
                            className="mx-auto mb-8 text-xl md:max-w-2xl opacity-90"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            Join thousands of travelers who have discovered the joy of stress-free travel planning with Greatertrips.
                        </motion.p>
                        <Link to='/create-trip'>
                            <motion.button
                                className="px-8 py-3 font-medium transition-all bg-white rounded-lg text-primary"
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Planning Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;