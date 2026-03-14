"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight, Eye, ShieldAlert } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (key: string) => void;
  className?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
  };
}

const DataTable = <T extends { id?: string | number }>({ 
  columns, 
  data, 
  onSort,
  className,
  pagination
}: DataTableProps<T>) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 dark:border-slate-800/50">
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded border-slate-300" />
              </th>
              {columns.map((column, idx) => (
                <th 
                  key={idx} 
                  className={cn(
                    "px-6 py-4 whitespace-nowrap",
                    column.sortable && "cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  )}
                  onClick={() => column.sortable && onSort?.(column.accessorKey as string)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && <ArrowUpDown size={12} />}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {data.map((item, rowIdx) => (
              <tr key={item.id || rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-slate-300" />
                </td>
                {columns.map((column, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as React.ReactNode)}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-t border-slate-50 dark:border-slate-800/50 gap-4 bg-slate-50/30 dark:bg-slate-900/30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rows per page</span>
              <div className="relative group">
                <select 
                  value={pagination.itemsPerPage}
                  onChange={(e) => pagination.onItemsPerPageChange(Number(e.target.value))}
                  className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                >
                  {[5, 10, 20, 50].map(val => (
                    <option key={val} value={val} className="dark:bg-slate-900">{val}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              <span className="text-slate-400">Page</span> <span className="text-slate-900 dark:text-white font-bold">{pagination.currentPage}</span> <span className="text-slate-400">of</span> <span className="text-slate-900 dark:text-white font-bold">{pagination.totalPages}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all text-slate-600 dark:text-slate-400 active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1.5 px-1">
              {(() => {
                const { currentPage, totalPages } = pagination;
                const pages = [];
                const showEllipsis = totalPages > 7;

                if (!showEllipsis) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  // Logic for ellipsis
                  if (currentPage <= 4) {
                    pages.push(1, 2, 3, 4, 5, '...', totalPages);
                  } else if (currentPage >= totalPages - 3) {
                    pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                  } else {
                    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                  }
                }

                return pages.map((p, i) => (
                  p === '...' ? (
                    <span key={`dots-${i}`} className="px-2 text-slate-400 font-bold text-xs select-none">...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => pagination.onPageChange(p as number)}
                      className={cn(
                        "min-w-[36px] h-9 rounded-xl text-xs font-bold transition-all active:scale-95",
                        currentPage === p 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/10" 
                          : "hover:bg-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                      )}
                    >
                      {p}
                    </button>
                  )
                ));
              })()}
            </div>

            <button 
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all text-slate-600 dark:text-slate-400 active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
