"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const journey = [
  {
    year: "2018",
    title: "Journey Started",
    description: "Began learning programming with Python and web fundamentals. Built first static websites.",
    side: "left",
  },
  {
    year: "2019",
    title: "Deep Learning Phase",
    description: "Mastered React, Node.js, and modern JavaScript. Contributed to open-source projects.",
    side: "right",
  },
  {
    year: "2020",
    title: "First Professional Role",
    description: "Joined Hashbit Solutions as a Frontend Developer. Built production apps used by thousands.",
    side: "left",
  },
];

export const MyJourney = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
        >
          My <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-lg"
        >
          From curious learner to full-stack developer
        </motion.p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-800" />

        <div className="space-y-12">
          {journey.map((item, index) => (
            <div key={item.year} className="relative flex items-center justify-between">
              {/* Dot on line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-4 border-slate-950 z-10" />

              <div className={`w-[45%] ${item.side === "left" ? "text-right" : "order-last text-left"}`}>
                <motion.div
                  initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 inline-block max-w-3xl ${item.side === "left" ? "text-right" : "text-left"}`}>
                    <span className="text-blue-500 font-bold text-sm mb-2 block tracking-widest">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              </div>
              <div className="w-[45%]" /> {/* Spacer */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
