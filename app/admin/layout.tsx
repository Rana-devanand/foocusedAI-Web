"use client";

import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCollapsed = useAppSelector((state) => state.ui.isSidebarCollapsed);

  return (
    <div className="flex w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div 
        className={cn(
          "relative flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
