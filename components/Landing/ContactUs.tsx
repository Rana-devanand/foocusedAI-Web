"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FiSend, FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";
import clsx from "clsx";

const socialLinks = [
  {
    name: "GitHub",
    icon: FiGithub,
    href: "#",
    hoverClasses: "group-hover:bg-white group-hover:text-slate-950 group-hover:border-white",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    href: "#",
    hoverClasses: "group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-[#0077b5]",
  },
  {
    name: "YouTube",
    icon: FiYoutube,
    href: "#",
    hoverClasses: "group-hover:bg-[#ff0000] group-hover:text-white group-hover:border-[#ff0000]",
  },
  {
    name: "dev.cloudapp93@gmail.com",
    icon: FiMail,
    href: "mailto:dev.cloudapp93@gmail.com",
    hoverClasses: "group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500",
  },
];

export const ContactUs = () => {
  return (
    <section id="contact-us" className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto py-12 md:py-24">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Get In <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Touch</span>
          <hr className="bg-linear-to-r from-blue-400 to-emerald-400 h-1 w-24 md:w-32 mx-auto mt-2 border-none" />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-[16px] max-w-2xl mx-auto"
        >
          Have a project in mind? Let's build something great together.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-slate-300 ml-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 text-sm rounded-sm bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-slate-300 ml-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 text-sm rounded-sm bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-slate-300 ml-1">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-2 text-sm rounded-sm bg-slate-900/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              ></textarea>
            </div>
            <Button size="md" className="w-full gap-2">
              <FiSend className="text-[16px]" />
              <span className="ml-2 text-[16px]">Send Message</span>
            </Button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:pl-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Let's Connect</h3>
          <div className="space-y-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex items-center gap-4 p-4 rounded-sm bg-slate-900/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 transition-all group"
              >
                <div className={clsx(
                  "h-10 w-10 rounded-sm bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:scale-110",
                  social.hoverClasses
                )}>
                  <social.icon className="text-lg" />
                </div>
                <span className="text-slate-400 font-medium group-hover:text-white transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
