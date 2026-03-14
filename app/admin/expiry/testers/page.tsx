"use client";

import React, { useState } from "react";
import {
  Search,
  Mail,
  Calendar,
  UserCheck
} from "lucide-react";
import { useGetAllTestersQuery } from "@/store/api/testerApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const TestersPage = () => {
  const { data: testers = [], isLoading } = useGetAllTestersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const testersList = Array.isArray(testers) ? testers : [];

  const filteredTesters = testersList.filter((tester: any) =>
    tester.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tester.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Fetching tester registrations...</p>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredTesters.length / rowsPerPage);
  const pagedTesters = filteredTesters.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    {
      header: "TESTER INFO",
      accessorKey: "username",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/10">
            <UserCheck size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{row.username || "Anonymous Tester"}</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Beta Phase 1</div>
          </div>
        </div>
      ),
    },
    {
      header: "EMAIL",
      accessorKey: "email",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Mail size={12} className="text-blue-500" />
          <span className="font-medium text-xs">{row.email}</span>
        </div>
      ),
    },
    {
      header: "NOTES",
      accessorKey: "notes",
      cell: (row: any) => (
        <p className="text-xs text-slate-500 font-medium italic break-words max-w-xs line-clamp-2">
          "{row.notes || "No notes provided"}"
        </p>
      ),
    },
    {
      header: "JOINED AT",
      accessorKey: "created_at",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Calendar size={12} className="text-emerald-500" />
          <span className="font-medium text-xs">
            {row.created_at ? format(new Date(row.created_at), "M/d/yy") : "N/A"}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Beta Testers</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Manage users who registered for beta testing</p>
      </div>

      {/* Search & Action Bar */}
      <div className="relative group max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search testers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none shadow-sm"
        />
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

export default TestersPage;