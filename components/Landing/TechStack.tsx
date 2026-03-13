"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const stack = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "React", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "TypeScript", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "Tailwind CSS", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Advanced", color: "text-blue-400", bg: "bg-blue-400/10" },
      { name: "Express", level: "Advanced", color: "text-blue-400", bg: "bg-blue-400/10" },
      { name: "REST APIs", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "MySQL", level: "Intermediate", color: "text-slate-400", bg: "bg-slate-400/10" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "React Native", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "Expo", level: "Advanced", color: "text-blue-400", bg: "bg-blue-400/10" },
      { name: "iOS/Android", level: "Intermediate", color: "text-blue-400", bg: "bg-blue-400/10" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "Vercel", level: "Expert", color: "text-emerald-400", bg: "bg-emerald-400/10" },
      { name: "Firebase", level: "Advanced", color: "text-blue-400", bg: "bg-blue-400/10" },
      { name: "Cloud Platforms", level: "Basic", color: "text-red-400", bg: "bg-blue-400/10" },
    ],
  },
];

export const TechStack = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-18">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-4xl font-bold text-white mb-4"
        >
          Tech <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Stack</span>
          <hr className="bg-linear-to-r from-blue-400 to-emerald-400 h-1 w-xs mx-auto mt-3" />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-md"
        >
          Technologies I work with daily to build great products
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stack.map((cat, index) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <h3 className="font-bold text-white mb-1 text-md">{cat.category}</h3>
              <hr className="bg-linear-to-r from-slate-500 to-slate-500 h-0.5 mb-4" />

              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between group w-[200px]">
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors text-sm">
                      {item.name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current ${item.color} ${item.bg}`}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
