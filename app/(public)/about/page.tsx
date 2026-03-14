import React from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const About = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
        Our Mission
      </h1>
      <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
        We are building the future of application management. Our goal is to provide developers and founders with a unified hub to manage, monitor, and scale all their digital products from a single, beautiful interface.
      </p>

      <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-3">
        {[
          { title: "Unified Control", desc: "Access all your apps, databases, and logs in one place." },
          { title: "Real-time Metrics", desc: "Stay on top of your performance with live dashboards." },
          { title: "Team Collaboration", desc: "Invite your team and manage permissions seamlessly." },
        ].map((feature, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-3xl bg-gray-900 p-12 text-white">
        <h2 className="text-3xl font-bold">Ready to take control?</h2>
        <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
          Join thousands of developers who are already using Admin Hub to manage their fleet of applications.
        </p>
        <div className="mt-10">
          <Link href="/login">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-none">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
