"use client";

import React from "react";
import {
  BarChart3,
  FileDown,
  Users,
  Package,
  Bell,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText as FilePdf,
  Info
} from "lucide-react";
import { useGetAdminReportsQuery, useLazyExportReportQuery } from "@/store/api/reportApi";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ReportsPage = () => {
  const { data: reportsData, isLoading, error } = useGetAdminReportsQuery();
  const [triggerExport, { isFetching: isExporting }] = useLazyExportReportQuery();

  const handleDownload = async (type: string, format: string) => {
    if (format === "pdf") {
      toast.info("PDF Export is currently being optimized. Please use CSV for now.");
      return;
    }

    const toastId = toast.loading(`Generating ${type} report...`);
    try {
      const blob = await triggerExport({ type, format }).unwrap();
      
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${type}_report_${new Date().toISOString().split('T')[0]}.${format}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report downloaded!`);
      }
    } catch (err) {
      toast.error("Failed to generate report. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Analyzing report data...</p>
      </div>
    );
  }

  const reportCards = [
    {
      id: "users",
      title: "User Activity Report",
      icon: Users,
      color: "blue",
      stats: {
        total: reportsData?.users?.total ?? 0,
        active: reportsData?.users?.active ?? 0,
        inactive: reportsData?.users?.inactive ?? 0
      },
      description: "Detailed analysis of user engagement and registration trends."
    },
    {
      id: "products",
      title: "Product Expiry Report",
      icon: Package,
      color: "emerald",
      stats: {
        total: reportsData?.products?.total ?? 0,
        expired: reportsData?.products?.expired ?? 0,
        soon: reportsData?.products?.soon ?? 0
      },
      description: "Inventory health report focusing on expiration alerts."
    },
    {
      id: "notifications",
      title: "Notification Performance",
      icon: Bell,
      color: "amber",
      stats: {
        total: reportsData?.notifications?.total ?? 0,
        read: reportsData?.notifications?.read ?? 0,
        pending: reportsData?.notifications?.pending ?? 0
      },
      description: "Delivery tracking and user read rates for system alerts."
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Reports</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Generate and download comprehensive data insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportCards.map((card, idx) => (
          <div key={idx} className="group bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110",
                card.color === "blue" && "bg-blue-500 text-white shadow-blue-500/20",
                card.color === "emerald" && "bg-emerald-500 text-white shadow-emerald-500/20",
                card.color === "amber" && "bg-amber-500 text-white shadow-amber-500/20"
              )}>
                <card.icon size={20} />
              </div>
              <button className="text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Info size={16} />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{card.title}</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(card.stats).map(([label, value], i) => (
                <div key={i} className="flex items-center text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}: </span>
                  <span className="text-slate-900 dark:text-white font-bold ml-1">{value}</span>
                  {i < Object.entries(card.stats).length - 1 && <span className="ml-2 text-slate-200 dark:text-slate-800">|</span>}
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-2">
              {card.description}
            </p>

            <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex gap-2.5">
              <button 
                onClick={() => handleDownload(card.id, "csv")}
                disabled={isExporting}
                className="flex-1 bg-slate-50/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-800 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all active:scale-95 group/btn disabled:opacity-50"
              >
                <FileSpreadsheet size={14} className="text-emerald-500 group-hover/btn:scale-110 transition-transform" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Footer */}
      <div className="bg-slate-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Generate Custom Report</h3>
            <p className="text-slate-400 text-xs font-medium mt-0.5">Select specific date ranges and data points for export</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all active:scale-95 whitespace-nowrap">
          <span>Launch Builder</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;