"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export const FloatingCards = () => {
  return (
    <div className="relative h-[400px] w-full">
      {/* Floating Card 1 */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-10 z-10 w-72"
      >
        <Card className="border-blue-500/30 bg-slate-900/50 backdrop-blur-md p-5 font-mono text-sm leading-relaxed">
          <div className="space-y-1">
            <div className="flex gap-2">
              <span className="text-blue-400">const</span>
              <span className="text-slate-100">developer</span>
              <span className="text-slate-400">=</span>
              <span className="text-slate-400">{"{"}</span>
            </div>
            <div className="pl-4 flex gap-1">
              <span className="text-emerald-400">stack:</span>
              <span className="text-amber-200">"Full Stack"</span>
              <span className="text-slate-400">,</span>
            </div>
            <div className="pl-4 flex gap-1">
              <span className="text-emerald-400">passion:</span>
              <span className="text-amber-200">"∞"</span>
            </div>
            <div className="text-slate-400">{"};"}</div>
          </div>
        </Card>
      </motion.div>

      {/* Floating Card 2 */}
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-10 top-20 z-20 w-64"
      >
        <Card className="border-emerald-500/30 bg-slate-900/50 backdrop-blur-md p-5 font-mono text-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-slate-500 text-[10px]">terminal</span>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-emerald-500">~</span>
              <span className="text-slate-300">npm run deploy</span>
            </div>
            <div className="text-slate-500 leading-tight">
              {">"} bundling assets...<br />
              {">"} uploading to cloud...<br />
              <span className="text-emerald-400">DONE</span> deployment success!
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating Card 3 */}
      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute left-20 bottom-10 z-30 w-64"
      >
        <Card className="border-slate-500/30 bg-slate-900/50 backdrop-blur-md p-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <div className="w-5 h-5 rounded bg-blue-500 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-100">Live Services</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Operational
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
