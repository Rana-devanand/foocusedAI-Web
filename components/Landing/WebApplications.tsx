"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Link from "next/link";

import Image from "next/image";

const webApps = [
  {
    title: "Expirely",
    description: "Track product expiration dates, receive smart notifications, and reduce waste — all from one beautiful app.",
    tech: ["React", "TypeScript", "Tailwind", "Node", "MySQL", "GROQ AI"],
    url: "https://expirely.foocusedai.com",
    codeURL:"https://github.com/Rana-devanand/expirely-web",
    image: "/web-app/expirely.png",
  },
  {
    title: "NeuroTrack",
    description: "NeuroTrack is an AI-powered app that analyzes your focus patterns, builds better productivity habits, and helps you achieve peak performance—one session at a time.",
    tech: ["React", "TypeScript", "Tailwind", "Node", "MySQL", "GROQ AI"],
    url: "https://app.neurotrack.foocusedai.com",
    codeURL:"https://github.com/Rana-devanand/neurotrack-web-app",
    image: "/web-app/neuuroTrack.png",
  }
];

export const WebApplications = () => {
  return (
    <section id="web-applications" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-4xl font-bold text-white mb-4"
        >
          Web <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Applications</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          Full-stack web platforms and SaaS products
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {webApps.map((app, index) => (
          <motion.div
            key={app.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(60%-2rem)] max-w-md"
          >
            <Card className="h-full border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden p-0 flex flex-col group">
              <div className="relative aspect-video bg-slate-800/50 flex flex-col border-b border-slate-800">
                 <div className="p-3 border-b border-slate-700/50 flex items-center justify-between ">
                    <div className="flex gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-red-500/50" />
                       <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                       <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="px-3 py-0.5 rounded-full bg-slate-900 flex items-center gap-1.5">
                       <div className="w-1 h-1 rounded-full bg-slate-600" />
                       <span className="text-[10px] text-slate-500">{app.url.split('//')[1]}</span>
                    </div>
                    <div className="w-8" />
                 </div>
                 <div className="grow relative overflow-hidden">
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300" />
                 </div>
              </div>
              
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-bold text-white mb-4">{app.title}</h3>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  {app.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {app.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                   <a href={app.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button size="sm" className="w-full gap-2 bg-blue-600 hover:bg-blue-800 font-bold rounded-sm! md:py-3 ">
                         <FiExternalLink /> 
                         <span className="ml-2">Live Site</span>
                      </Button>
                   </a>
                   <a href={app.codeURL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 gap-2 font-bold rounded-sm! md:py-3">
                          <FiGithub /> 
                          <span className="ml-2">Code</span>
                      </Button>
                   </a>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
