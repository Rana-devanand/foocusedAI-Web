"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-white dark:bg-slate-900 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Admin Hub Login</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in to your account to continue</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="dev.foocusedai@gmail.com" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <input type="password" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
            </div>
            <Button className="w-full" size="lg">Sign In</Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
