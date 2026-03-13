import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const Contact = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Get in touch
          </h1>
          <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
            Have questions about Admin Hub? We're here to help. Send us a message and our team will get back to you as soon as possible.
          </p>
          
          <div className="mt-12 space-y-8">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold">@</div>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-slate-600 dark:text-slate-400">dev.cloudapp93@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 font-bold">L</div>
              <div>
                <p className="font-bold">Location</p>
                <p className="text-slate-600 dark:text-slate-400">Mohali, Phase 8B , Punjab , India</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="p-5">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs mx-1 font-medium">First Name</label>
                <input className="w-full rounded-sm border border-slate-200 dark:border-slate-800 bg-transparent p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-xs mx-1 font-medium">Last Name</label>
                <input className="w-full rounded-sm border border-slate-200 dark:border-slate-800 bg-transparent p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs mx-1 font-medium">Email Address</label>
              <input type="email" className="w-full rounded-sm border border-slate-200 dark:border-slate-800 bg-transparent p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs mx-1 font-medium">Message</label>
              <textarea rows={4} className="w-full rounded-sm border border-slate-200 dark:border-slate-800 bg-transparent p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help?" />
            </div>
            <Button className="w-full" size="lg">Send Message</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
