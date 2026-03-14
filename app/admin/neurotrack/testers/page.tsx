"use client";

import React, { useState } from "react";
import {
  FlaskConical,
  Search,
  Mail,
  Calendar,
  UserCheck,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  MoreHorizontal
} from "lucide-react";
import { useGetNTTestersQuery, useUpdateNTTesterStatusMutation } from "@/store/api/neuroTrackApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const NTTestersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: testers = [], isLoading } = useGetNTTestersQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateNTTesterStatusMutation();

  const testersList = Array.isArray(testers) ? testers : [];

  const filteredTesters = testersList.filter((tester: any) =>
    tester.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tester.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTesters.length / rowsPerPage);
  const pagedTesters = filteredTesters.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      await updateStatus({ id, active: !currentStatus }).unwrap();
      toast.success(`Tester ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      toast.error("Failed to update tester status");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading beta testers...</p>
      </div>
    );
  }

  const columns = [
    {
      header: "NAME",
      accessorKey: "name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0 border border-indigo-500/10">
            <UserCheck size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{row.name || "Anonymous"}</div>
            <div className="text-[10px] text-slate-400 font-medium">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "MESSAGE",
      accessorKey: "message",
      cell: (row: any) => (
        <div className="flex items-start gap-2 max-w-[240px]">
          <MessageSquare size={12} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic line-clamp-2">
            "{row.message || "No message provided"}"
          </p>
        </div>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "active",
      cell: (row: any) => (
        <div className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1",
          row.active 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
        )}>
          {row.active ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      header: "APPLIED AT",
      accessorKey: "created_at",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium text-xs">
          <Calendar size={12} />
          {row.created_at ? format(new Date(row.created_at), "M/d/yy") : "N/A"}
        </div>
      ),
    },
    {
      header: "ACTIONS",
      accessorKey: "id",
      cell: (row: any) => (
        <button
          onClick={() => handleStatusToggle(row.id, row.active)}
          disabled={isUpdating}
          className={cn(
            "p-1.5 rounded-lg transition-all active:scale-95 border",
            row.active
              ? "bg-rose-50 dark:bg-rose-900/10 text-rose-600 border-rose-100 dark:border-rose-900/20 hover:bg-rose-100"
              : "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-emerald-100 dark:border-emerald-900/20 hover:bg-emerald-100"
          )}
          title={row.active ? "Deactivate" : "Activate"}
        >
          {row.active ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Beta Testers</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Review and manage NeuroTrack beta applications</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search testers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 transition-all w-64 outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={pagedTesters}
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

export default NTTestersPage;
