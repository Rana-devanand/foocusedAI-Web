"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewritter";
import { HiArrowRight } from "react-icons/hi2";
import { FiMail } from "react-icons/fi";

export const HeroClient = () => {
    const words = [
        "Full Stack Developer",
        "Mobile App Developer",
        "AI Integration",
        "SaaS Platforms"
    ];

    const text = useTypewriter(words, {
        typingSpeed: 100,
        erasingSpeed: 50,
        pauseDuration: 3000,
        smoothness: true
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight">
                Building the <span className="text-blue-600">Future</span> of digital products
            </h1>
            <p className="mt-6 min-h-12 text-lg text-slate-600 dark:text-slate-400 flex items-center ">
                <span className="text-lg font-bold animate-pulse">{text}</span>
                <span className="ml-1 inline-block h-5 w-1 animate-pulse bg-blue-600" />
            </p>
            <p className="mt-6 min-h-12 text-sm text-slate-600 dark:text-slate-400 flex items-center ">I design and develop high-performance web and mobile applications that solve real-world problems. From concept to deployment, I build scalable, user-friendly, and production-ready digital products. Explore my live projects, case studies, and applications that showcase my skills, creativity, and technical expertise.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link href="#web-applications" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full gap-3 text-sm sm:text-lg px-6 py-3 sm:px-8 sm:py-4 bg-white text-black cursor-pointer">
                        <span>View Projects</span> <HiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="outline" size="md" className="w-full gap-3 text-sm sm:text-lg px-6 py-3 sm:px-8 sm:py-4 cursor-pointer">
                        <FiMail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        <span>Contact Me</span>
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};
