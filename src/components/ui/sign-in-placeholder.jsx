"use client"
import { motion } from "framer-motion"

export default function SignInPlaceholder() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-background via-background to-background/80">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="relative p-8 overflow-hidden border shadow-xl rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg dark:bg-black/5">
                    <div className="absolute w-64 h-64 rounded-full -top-24 -right-24 bg-primary/10 blur-3xl" />
                    <div className="absolute w-64 h-64 rounded-full -bottom-24 -left-24 bg-indigo-500/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center justify-center mb-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-10 h-10 border-2 rounded-full border-primary/30 border-t-primary"
                            />
                        </div>

                        <h2 className="mb-2 text-2xl font-light tracking-tight text-center text-foreground">
                            <span className="font-medium">Preparing</span> your experience
                        </h2>

                        <p className="text-sm text-center text-muted-foreground/80">
                            We're setting up your sign-in form. Just a moment...
                        </p>

                        <div className="flex justify-center w-full mt-6 space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="h-1.5 w-1.5 rounded-full bg-primary"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: i * 0.2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
