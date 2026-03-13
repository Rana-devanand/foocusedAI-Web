import React from "react";
import { FloatingCards } from "./FloatingCards";
import { HeroClient } from "./HeroClient";

const Hero = () => {
    return (
        <section className="relative overflow-hidden py-4 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <div className="relative order-2 lg:order-1">
                        <HeroClient />
                    </div>
                    <div className="hidden md:block order-1 lg:order-2">
                        <FloatingCards />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
