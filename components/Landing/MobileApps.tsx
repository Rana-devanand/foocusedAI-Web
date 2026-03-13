"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FiDownload, FiFileText } from "react-icons/fi";
import { IoLogoApple, IoLogoAndroid } from "react-icons/io5";
import Image from "next/image";

const apps = [
  {
    title: "Expirely",
    description: "Track expiry dates, get timely reminders, and reduce waste — all in one smart app.",
    tech: ["React Native", "TypeScript", "Tailwind", "Node", "MySQL", "GROQ AI"],
    features: ["Expiry Tracking", "Smart Notifications", "Waste Reduction", "Easy Inventory Management"],
    phoneImage: "/expirely.png"
  },
  {
    title: "NeuroTrack",
    description: "NeuroTrack is an AI-powered app that understands your focus patterns and helps you build powerful productivity habits.",
    tech: ["React Native", "TypeScript", "Tailwind", "Node", "MySQL", "GROQ AI"],
    features: ["AI-Powered Insights", "Focus Tracking", "Productivity Analytics", "Personalized Recommendations"],
    phoneImage: "/neurotrack.jpeg"
  }
];

export const MobileApps = () => {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-4"
        >
          Mobile <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Apps</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-sm md:text-lg"
        >
          Native mobile applications crafted for performance
        </motion.p>
      </div>

      <div className="flex flex-col items-center gap-12">
        {apps.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full max-w-4xl"
          >
            <Card className="h-full border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden p-0 flex flex-col md:flex-row group">
              {/* Left Side: Phone Image */}
              <div className="w-full md:w-2/5 bg-slate-800/30 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 relative min-h-[400px] md:min-h-[350px] overflow-hidden">
                <div className="relative w-48 h-88 transition-transform duration-500 group-hover:scale-105">
                   {/* Phone Mockup Frame */}
                   <div className="absolute inset-0 rounded-[2.5rem] border-[6px] border-black/90 z-10 shadow-2xl overflow-hidden shadow-black/50">
                      <Image
                        src={app.phoneImage}
                        alt={app.title}
                        fill
                        className="object-cover"
                      />
                   </div>
                   {/* Notch */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/90 rounded-b-2xl z-20" />
                </div>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-3/5 p-6 md:p-8 lg:p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                   <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{app.title}</h3>
                </div>

                <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
                  {app.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {app.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-sm text-xs font-semibold bg-slate-800/50 text-slate-300 border border-slate-700 group-hover:border-blue-500/30 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mb-10">
                   <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Key Features</h4>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                     {app.features.map(f => (
                       <li key={f} className="text-sm text-slate-400 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          {f}
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button size="md" className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 rounded-sm">
                    <FiDownload />
                    <span className="ml-2"> Download App</span>
                  </Button>
                  <Button variant="outline" size="md" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 gap-2 rounded-sm">
                    <FiFileText />
                    <span className="ml-2"> Documentation</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
