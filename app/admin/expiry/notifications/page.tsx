"use client";

import React, { useState } from "react";
import {
  Bell,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  MessageSquare,
  Package
} from "lucide-react";
import {
  useGetAdminNotificationsQuery,
  useAdminSendNotificationMutation
} from "@/store/api/notificationApi";
import DataTable from "@/components/ui/DataTable";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const NotificationsPage = () => {
  const { data: notifications = [], isLoading, error } = useGetAdminNotificationsQuery();
  const [sendNotification, { isLoading: isSending }] = useAdminSendNotificationMutation();

  const [formData, setFormData] = useState({
    target: "All Users",
    message: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Safely handle data
  const notificationsList = Array.isArray(notifications) ? notifications : [];

  const totalPages = Math.ceil(notificationsList.length / rowsPerPage);
  const pagedNotifications = notificationsList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      await sendNotification({
        target: formData.target,
        message: formData.message
      }).unwrap();
      toast.success("Notification sent successfully!");
      setFormData({ ...formData, message: "" });
    } catch (error) {
      toast.error("Failed to send notification");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading notification feeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl p-8 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-amber-900 dark:text-amber-400">Connection Issue</h2>
          <p className="text-sm text-amber-700 dark:text-amber-500/80 mb-4">
            Could not load notification history. Please ensure you are logged in.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-xs font-bold text-amber-600 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const columns = [
    {
      header: "MESSAGE",
      accessorKey: "message",
      cell: (row: any) => (
        <p className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">{row.message}</p>
      ),
    },
    {
      header: "TARGET",
      accessorKey: "target",
      cell: (row: any) => (
        <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{row.target || "All Users"}</p>
      ),
    },
    {
      header: "DATE",
      accessorKey: "created_at",
      cell: (row: any) => (
        <p className="text-[10px] text-slate-500 font-medium">
          {row.created_at ? format(new Date(row.created_at), "M/d/yy") : "N/A"}
        </p>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: (row: any) => (
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
          row.status === "Read" ? "text-emerald-500" : "text-amber-500"
        )}>
          {row.status === "Read" ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
          {row.status || "Unread"}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Manage and send notifications to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logs Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-transparent">
              <div className="flex items-center gap-2">
                <Clock className="text-emerald-500 w-4 h-4" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Notification Logs</h2>
              </div>
            </div>

            <DataTable
              columns={columns}
              data={pagedNotifications}
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

        {/* Send Section */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Send size={16} />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Send Notification</h2>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Target Audience</label>
                <div className="relative group">
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none appearance-none"
                  >
                    <option>All Users</option>
                    <option>Premium Users</option>
                    <option>Inactive Users</option>
                  </select>
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message Content</label>
                <div className="relative group">
                  <textarea
                    rows={5}
                    placeholder="Type message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 text-xs font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none resize-none"
                  />
                  <MessageSquare className="absolute right-3 bottom-3 w-3.5 h-3.5 text-slate-400 opacity-20" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                {isSending ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;