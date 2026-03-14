"use client";

import { Bell, Moon, Sun, User, Layers, LayoutGrid } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import AppSwitcherModal from "./AppSwitcherModal";

const DashboardHeader = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between z-10">
      {/* App Switcher Hub Button (Replacing Search) */}
      <div className="flex-1 max-w-xl">
        <button 
          onClick={() => setIsAppSwitcherOpen(true)}
          className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border-none rounded-2xl py-2.5 px-5 text-sm transition-all group w-fit"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Layers className="text-white w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Ecosystem</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">App Switcher HUB</p>
          </div>
          <div className="ml-4 w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <LayoutGrid size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors ml-2" />
        </button>
      </div>

      <AppSwitcherModal 
        isOpen={isAppSwitcherOpen} 
        onClose={() => setIsAppSwitcherOpen(false)} 
      />

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 px-3 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Production</span>
        </div>

        <button className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-500 relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full" />
        </button>


        <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-2" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">
            {user?.email?.substring(0, 2).toUpperCase() || "AD"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
