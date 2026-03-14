"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Layers, 
  BarChart3, 
  FileText, 
  BrainCircuit, 
  Clock, 
  Settings, 
  Database, 
  Users, 
  ShieldCheck, 
  Users2, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Package,
  MessageSquare,
  FlaskConical,
  Mail,
  CreditCard,
  Bell,
  Search
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";

const Sidebar = () => {
  const pathname = usePathname();
  const isCollapsed = useAppSelector((state) => state.ui.isSidebarCollapsed);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const lenis = useLenis();
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  // Sync with localStorage
  useEffect(() => {
    const updateApps = () => {
      const saved = localStorage.getItem("selectedApps");
      if (saved) {
        setSelectedApps(JSON.parse(saved));
      } else {
        setSelectedApps(["NeuroTrack", "Expiry"]);
      }
    };

    updateApps();
    window.addEventListener("storage_apps_updated", updateApps);
    return () => window.removeEventListener("storage_apps_updated", updateApps);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const navItems: { label: string; type?: "header" | "item"; icon?: any; href?: string; appId?: string }[] = [
    { label: "CORE HUB", type: "header" },
    { icon: LayoutDashboard, label: "Main Dashboard", href: "/admin/dashboard", type: "item" },
    
    // NeuroTrack Section
    { label: "NEUROTRACK", type: "header", appId: "NeuroTrack" },
    { icon: Mail, label: "NT-Emails", href: "/admin/neurotrack/emails", type: "item", appId: "NeuroTrack" },
    { icon: CreditCard, label: "NT-Subscriptions", href: "/admin/neurotrack/subscriptions", type: "item", appId: "NeuroTrack" },
    { icon: FlaskConical, label: "NT-Testers", href: "/admin/neurotrack/testers", type: "item", appId: "NeuroTrack" },
    { icon: ShieldCheck, label: "NT-Verification", href: "/admin/neurotrack/verification", type: "item", appId: "NeuroTrack" },
    
    // Smart Expiry Section
    { label: "SMART EXPIRY", type: "header", appId: "Expiry" },
    { icon: Package, label: "EXP-Products", href: "/admin/expiry/products", type: "item", appId: "Expiry" },
    { icon: Bell, label: "EXP-Notifications", href: "/admin/expiry/notifications", type: "item", appId: "Expiry" },
    { icon: Search, label: "EXP-Testers", href: "/admin/expiry/testers", type: "item", appId: "Expiry" },
    { icon: FileText, label: "EXP-Reports", href: "/admin/expiry/reports", type: "item", appId: "Expiry" },
    
    { label: "SYSTEM & ACCESS", type: "header" },
    { icon: Settings, label: "Configurations", href: "/admin/config", type: "item" },
    { icon: Database, label: "API Integrations", href: "/admin/integrations", type: "item" },
    { icon: Users2, label: "Admin Teams", href: "/admin/teams", type: "item" },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.appId) return selectedApps.includes(item.appId);
    return true;
  });

  return (
    <aside 
      onMouseEnter={() => lenis?.stop()}
      onMouseLeave={() => lenis?.start()}
      className={cn(
        "h-screen bg-white dark:bg-slate-950 border-r fixed border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col z-50",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Toggle Slider - Premium Floating Handle */}
      <button 
        onClick={() => dispatch(toggleSidebar())}
        className={cn(
          "absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-blue-900 dark:bg-blue-800 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] z-50 hover:h-16 active:scale-95 transition-all duration-300 group",
          isCollapsed ? "cursor-pointer" : "cursor-pointer"
        )}
      >
        <div className="flex flex-col gap-0.5 items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
          {isCollapsed ? <ChevronRight size={12} className="text-white" /> : <ChevronLeft size={12} className="text-white" />}
          <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white" />
        </div>
      </button>

      {/* Logo Area */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
          <BrainCircuit className="text-white w-4 h-4" />
        </div>
        {!isCollapsed && (
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">Admin HUB</span>
        )}
      </div>

      {/* Nav Items - Scrollable Container */}
      <div 
        data-lenis-prevent
        className="flex-1 overflow-y-auto px-4 py-2 space-y-0.5 scrollbar-none hover:scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 transition-all"
      >
        {filteredNavItems.map((item, index) => {
          if (item.type === "header") {
            return !isCollapsed && (
              <h3 key={index} className="text-[9px] font-bold text-slate-400 mt-5 mb-1.5 uppercase tracking-wider px-2">
                {item.label}
              </h3>
            );
          }

          const Icon = item.icon;
          return (
            <Link 
              key={index} 
              href={item.href || "#"} 
              className={cn(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group",
                pathname === item.href 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
              )}
            >
              {Icon && <Icon className={cn("w-4 h-4 shrink-0", pathname === item.href ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600")} />}
              {!isCollapsed && <span className="text-xs font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Logout - Isolated at Bottom */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-all group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-600" />
          {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;