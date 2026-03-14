"use client";

import React, { useState, useEffect } from "react";
import GlobalModal from "../ui/GlobalModal";
import { Button } from "../ui/Button";
import { BrainCircuit, Clock, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_APPS = [
  { id: "NeuroTrack", name: "NeuroTrack", icon: BrainCircuit, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "Expiry", name: "Smart Expiry Tracker", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
];

const AppSwitcherModal: React.FC<AppSwitcherModalProps> = ({ isOpen, onClose }) => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedApps");
    if (saved) {
      setSelectedApps(JSON.parse(saved));
    } else {
      // Default to all apps if nothing saved
      const allAppIds = AVAILABLE_APPS.map(app => app.id);
      setSelectedApps(allAppIds);
      localStorage.setItem("selectedApps", JSON.stringify(allAppIds));
    }
  }, []);

  const toggleApp = (appId: string) => {
    setSelectedApps(prev => {
      const next = prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId];
      return next;
    });
  };

  const handleSave = () => {
    localStorage.setItem("selectedApps", JSON.stringify(selectedApps));
    // Trigger a storage event manually so other components can react
    window.dispatchEvent(new Event("storage_apps_updated"));
    onClose();
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onClose={onClose}
      title="App Switcher Hub"
      className="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Select which applications you want to manage. This will update your sidebar navigation and dashboard view.
        </p>

        <div className="space-y-2.5">
          {AVAILABLE_APPS.map((app) => {
            const isSelected = selectedApps.includes(app.id);
            const Icon = app.icon;

            return (
              <div
                key={app.id}
                onClick={() => toggleApp(app.id)}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group",
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10"
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-all", app.bg)}>
                    <Icon className={cn("w-5 h-5", app.color)} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{app.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Active Integrated App</p>
                  </div>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="text-blue-600 w-5 h-5" />
                ) : (
                  <Circle className="text-slate-200 dark:text-slate-800 w-5 h-5 group-hover:text-slate-300 transition-colors" />
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-3 flex gap-2.5">
          <Button variant="outline" className="flex-1 text-xs py-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1 text-xs py-2" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </GlobalModal>
  );
};

export default AppSwitcherModal;