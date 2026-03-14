"use client";

import {
  Users,
  Activity,
  Bell,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import DataTable, { Column } from "@/components/ui/DataTable";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { getDashboardData } from "@/lib/api/dashboard";
import { toast } from "sonner";
import { Eye, ShieldAlert, Loader2 } from "lucide-react";

const Dashboard = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{ stats: any[], users: any[] } | null>(null);

  // Filtering State
  const [selectedApp, setSelectedApp] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getDashboardData(token);
        if (response.success) {
          setDashboardData(response.data);
        }
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const statIcons: Record<string, any> = {
    "Total Users": Users,
    "Active Users ": Activity,
    "Notification": Bell,
  };

  const allUsers = dashboardData?.users || [];

  // Filter logic
  const filteredUsers = selectedApp === "All"
    ? allUsers
    : allUsers.filter(u => u.appId === selectedApp);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const pagedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = (dashboardData?.stats || []).map(s => ({
    ...s,
    icon: statIcons[s.label] || Activity
  }));

  interface UserData {
    id: number;
    name: string;
    email: string;
    image?: string | null;
    appId: string;
    role: string;
    status: string;
    statusColor: string;
    Created: string;
    usage: number;
  }

  const columns: Column<UserData>[] = [
    {
      header: "User",
      accessorKey: "name",
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-2.5">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-7 h-7 rounded-md object-cover border border-slate-100 dark:border-slate-800 shrink-0" />
          ) : (
            <div className="w-7 h-7 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-[9px] shrink-0">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{user.name}</p>
            <p className="text-[9px] text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "App Name",
      accessorKey: "appId",
      sortable: true,
      cell: (user) => (
        <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{user.appId}</span>
      )
    },
    {
      header: "Role",
      accessorKey: "role",
      sortable: true
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (user) => (
        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider", user.statusColor)}>
          {user.status}
        </span>
      )
    },
    {
      header: "Created",
      accessorKey: "Created"
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (user) => (
        <div className="flex items-center gap-1.5">
          <button className="p-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30" title="View Details">
            <Eye size={12} />
          </button>
          <button className="p-1 rounded-md bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30" title="Block User">
            <ShieldAlert size={12} />
          </button>
        </div>
      )
    }
  ];

  if (loading && !dashboardData) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Preparing your data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-500 p-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Manage your multi-app ecosystem</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <Button
            variant={selectedApp === "All" ? "primary" : "ghost"}
            size="sm"
            className={cn("rounded-lg text-xs h-8 px-3 transition-all", selectedApp === "All" && "shadow-sm shadow-blue-500/20")}
            onClick={() => { setSelectedApp("All"); setCurrentPage(1); }}
          >
            All
          </Button>
          <Button
            variant={selectedApp === "NeuroTrack" ? "primary" : "ghost"}
            size="sm"
            className={cn("rounded-lg text-xs h-8 px-3 transition-all", selectedApp === "NeuroTrack" && "shadow-sm shadow-blue-500/20")}
            onClick={() => { setSelectedApp("NeuroTrack"); setCurrentPage(1); }}
          >
            NeuroTrack
          </Button>
          <Button
            variant={selectedApp === "Expiry" ? "primary" : "ghost"}
            size="sm"
            className={cn("rounded-lg text-xs h-8 px-3 transition-all", selectedApp === "Expiry" && "shadow-sm shadow-blue-500/20")}
            onClick={() => { setSelectedApp("Expiry"); setCurrentPage(1); }}
          >
            Smart Expiry Tracker
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* User Management Table - Full Width */}
      <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-transparent">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">User Management</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{filteredUsers.length} {selectedApp !== "All" ? `${selectedApp} ` : ""}users</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={pagedUsers}
          pagination={{
            currentPage,
            totalPages,
            itemsPerPage,
            onPageChange: setCurrentPage,
            onItemsPerPageChange: handleItemsPerPageChange
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;