"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { FiExternalLink, FiYoutube } from "react-icons/fi";

const videos = [
  {
    title: "How to Build an AI Mobile App Using React Native, Node.js & Groq API (No ML Required)",
    description: "In this video, I show you how to build a simple AI-powered mobile application using React Native Expo for the frontend and a Node.js backend integrated with Groq API.",
    id: "r_PN1m5tHIA",
    url: "https://youtu.be/r_PN1m5tHIA?si=V-DMLTAVIJaB2x9D"
  },
  {
    title: "How I Got Google OAuth Verified (Gmail API Approval Step-by-Step 2026)",
    description: "In this video, I share my step-by-step process for getting Google OAuth verification for my app, including how I handled the Gmail API approval process.",
    id: "5-1z4LSIU6Q",
    url: "https://youtu.be/5-1z4LSIU6Q?si=tXyL3yGR-DoIsA27"
  }
];

export const YouTubeContent = () => {
  return (
    <section id="youtube" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10" />

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider mb-4"
        >
          <FiYoutube className="text-sm" /> Latest Content
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight"
        >
          Tech <span className="text-blue-500">Tutorials</span> & Deep Dives
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          Sharing insights on full-stack development, mobile apps, and modern AI integrations to help you build better products.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {videos.map((vid, index) => (
          <motion.div
            key={vid.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="group h-full border-slate-800 bg-slate-900/60 backdrop-blur-xl overflow-hidden p-0 flex flex-col hover:border-blue-500/40 transition-all duration-500 relative">
              {/* Responsive Iframe Container */}
              <div className="relative aspect-video w-full bg-black overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title={vid.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                  {vid.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {vid.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <a 
                    href={vid.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 font-bold text-sm group/btn hover:text-blue-400 transition-colors"
                  >
                    Watch on YouTube 
                    <FiExternalLink className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-[10px] text-slate-400 font-mono">
                    HD AVAILABLE
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
