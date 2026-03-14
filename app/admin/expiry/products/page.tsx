"use client";

import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Calendar,
  User as UserIcon,
  Tag
} from "lucide-react";
import { useGetAdminProductsQuery } from "@/store/api/productApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const ProductsPage = () => {
  const { data: products = [], isLoading, error } = useGetAdminProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Safely handle products data
  const productsList = Array.isArray(products) ? products : [];

  const filteredProducts = productsList.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading products database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <Package size={32} />
          </div>
          <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Connection Error</h2>
          <p className="text-red-700 dark:text-red-500/80 mb-6 font-medium">
            We couldn't retrieve the products list. This might be due to an expired session or server maintenance.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-500/20"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const columns = [
// ... (rest of columns remain the same)
    {
      header: "PRODUCT NAME",
      accessorKey: "name",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
            {row.imageUrl ? (
              <img src={row.imageUrl} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <Package size={16} className="text-slate-400" />
            )}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{row.name}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "CATEGORY",
      accessorKey: "category",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Tag size={12} className="text-blue-500" />
          <span className="text-xs font-medium">{row.category}</span>
        </div>
      ),
    },
    {
      header: "EXPIRY DATE",
      accessorKey: "expiryDate",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <Calendar size={12} className="text-emerald-500" />
          <span className="text-xs font-medium">{row.expiryDate ? format(new Date(row.expiryDate), "M/d/yy") : "N/A"}</span>
        </div>
      ),
    },
    {
      header: "ADDED BY",
      accessorKey: "addedBy",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
          <UserIcon size={12} className="text-purple-500" />
          <span className="text-xs font-medium">{row.addedBy || "System"}</span>
        </div>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: (row: any) => (
        <div className={cn(
          "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-flex items-center",
          row.status?.toLowerCase() === "active"
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
            : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
        )}>
          {row.status || "Active"}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Products Catalog</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Manage and monitor inventory life-cycle</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-blue-500/20 transition-all w-56 outline-none"
            />
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all shadow-sm">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          data={pagedProducts}
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

export default ProductsPage;