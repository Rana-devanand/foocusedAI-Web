"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  trendType: "up" | "down" | "neutral";
  chartData?: number[];
  color: string;
}

const StatCard = ({ icon: Icon, label, value, trend, trendType, color }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-36"
    >
      <div className="flex justify-between items-start">
        <div className={cn("p-2.5 rounded-2xl", color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full text-[11px] font-bold flex items-center gap-1",
          trendType === "up" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : 
          trendType === "down" ? "bg-red-50 dark:bg-red-900/20 text-red-600" :
          "bg-slate-50 dark:bg-slate-900 text-slate-600"
        )}>
          {trendType === "up" ? "+" : ""}{trend}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
