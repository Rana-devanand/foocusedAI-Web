"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Filter,
  Calendar,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Zap,
  Globe,
  Clock
} from "lucide-react";
import { useGetNTSubscriptionsQuery } from "@/store/api/neuroTrackApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const NTSubscriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useGetNTSubscriptionsQuery({
    page: currentPage,
    limit: rowsPerPage,
    search: searchTerm
  });

  const subscriptionsList = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading subscription records...</p>
      </div>
    );
  }

  const columns = [
    {
      header: "USER INFO",
      accessorKey: "user_name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <UserIcon size={14} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{row.user_name}</div>
            <div className="text-[10px] text-slate-400 font-medium">{row.user_email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "PLAN",
      accessorKey: "plan_id",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Zap size={12} />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            {row.plan_id || "Standard"}
          </span>
        </div>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: (row: any) => (
        <div className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1",
          row.status?.toLowerCase() === "active" 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
            : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
        )}>
          {row.status?.toLowerCase() === "active" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
          {row.status || "Inactive"}
        </div>
      ),
    },
    {
      header: "PERIOD END",
      accessorKey: "current_period_end",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-xs">
          <Calendar size={12} className="text-rose-400" />
          {row.current_period_end ? format(new Date(row.current_period_end), "MMM d, yyyy") : "N/A"}
        </div>
      ),
    },
    {
      header: "CREATED AT",
      accessorKey: "created_at",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
          <Clock size={12} />
          {row.created_at ? format(new Date(row.created_at), "M/d/yy") : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Subscriptions</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Manage user plans and billing cycles</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-500/20 transition-all w-64 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={subscriptionsList}
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

export default NTSubscriptionsPage;
