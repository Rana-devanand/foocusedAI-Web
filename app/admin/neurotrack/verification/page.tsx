"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  User as UserIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  Smartphone,
  Download
} from "lucide-react";
import { useGetNTVerificationQuery } from "@/store/api/neuroTrackApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const NTVerificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("not-installed");

  const { data, isLoading, error } = useGetNTVerificationQuery({
    skip: (currentPage - 1) * rowsPerPage,
    limit: rowsPerPage,
    status: statusFilter
  });

  const installersList = data?.users || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Scanning device registrations...</p>
      </div>
    );
  }

  const columns = [
    {
      header: "USER INFO",
      accessorKey: "name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
            <Smartphone size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{row.name || "Beta Tester"}</div>
            <div className="text-[10px] text-slate-400 font-medium">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "APP STATUS",
      accessorKey: "status",
      cell: (row: any) => (
        <div className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5",
          row.status === "Installed" 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm shadow-emerald-500/5"
            : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
        )}>
          {row.status === "Installed" ? <Download size={10} /> : <Clock size={10} />}
          {row.status}
        </div>
      ),
    },
    {
      header: "APPLIED AT",
      accessorKey: "created_at",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-xs">
          <Calendar size={12} className="text-slate-400" />
          {row.created_at ? format(new Date(row.created_at), "MMM d, yyyy") : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">14 Days Verification</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Track app installation and active testing status</p>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mr-2">
            <button
              onClick={() => { setStatusFilter("not-installed"); setCurrentPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                statusFilter === "not-installed" 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Pending
            </button>
            <button
              onClick={() => { setStatusFilter("installed"); setCurrentPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                statusFilter === "installed" 
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Installed
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all w-48 outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={installersList}
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            itemsPerPage: rowsPerPage,
            onPageChange: setCurrentPage,
            onItemsPerPageChange: (rows) => {
              setRowsPerPage(rows);
              setCurrentPage(1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default NTVerificationPage;
