"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { useAppSelector } from "@/store/hooks";
import { IoPeople, IoCash, IoRocket, IoStatsChart } from "react-icons/io5";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,543", icon: <IoPeople className="h-6 w-6 text-blue-600" />, change: "+12.5%" },
    { title: "Revenue", value: "$45,231.89", icon: <IoCash className="h-6 w-6 text-emerald-600" />, change: "+8.2%" },
    { title: "Active Apps", value: "12", icon: <IoRocket className="h-6 w-6 text-purple-600" />, change: "+2" },
    { title: "Conversion", value: "3.2%", icon: <IoStatsChart className="h-6 w-6 text-orange-600" />, change: "-0.4%" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <span className={stat.change.startsWith("+") ? "text-xs font-medium text-emerald-600" : "text-xs font-medium text-red-600"}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-6 text-lg font-bold">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div>
                    <p className="text-sm font-bold">New deployment on App {item}</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600 dark:bg-blue-900/20">Success</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card>
          <h3 className="mb-6 text-lg font-bold">App Health</h3>
          <div className="space-y-4">
            {["API Gateway", "Auth Service", "Billing Hub", "Storage"].map((item) => (
              <div key={item} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item}</span>
                  <span className="font-bold">99.9%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-[99.9%] rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
