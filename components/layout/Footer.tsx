"use client";

import React from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-black py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold font-mono">
                <span className="text-blue-500">{"<"}</span>
                <span className="text-white">Dev</span>
                <span className="text-emerald-500">{" />"}</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full-stack & mobile developer crafting modern digital experiences with cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">Home</Link></li>
              <li><Link href="#experience" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">Experience</Link></li>
              <li><Link href="#about" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">About</Link></li>
              <li><Link href="#contact" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
               {[FiGithub, FiLinkedin, FiYoutube, FiMail].map((Icon, i) => (
                 <a 
                   key={i} 
                   href="#" 
                   className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all"
                 >
                   <Icon />
                 </a>
               ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Dev Portfolio. Built with passion and modern tech.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
