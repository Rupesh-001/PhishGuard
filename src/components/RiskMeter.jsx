import React from "react";
import { SEVERITY_COLOR } from "../constants";

export default function RiskMeter({ score, level }) {
  const color =
    SEVERITY_COLOR[level] || SEVERITY_COLOR.low;

  const label =
    level === "high"
      ? "High risk"
      : level === "medium"
        ? "Medium risk"
        : "Low risk";

  return (
    <div className="rounded-2xl border border-[#242f3d] bg-[#0d131b] p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.13em] text-[#647083]">
            Risk assessment
          </div>

          <div
            className="mt-1 text-[17px] font-semibold"
            style={{ color }}
          >
            {label}
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold tracking-[-0.04em] text-[#edf2f7]">
            {score}
            <span className="text-sm font-medium text-[#596577]">
              /100
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#202936]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${score}%`,
            background: color,
          }}
        />
      </div>

      <div className="mt-2 flex justify-between text-[9px] uppercase tracking-[0.08em] text-[#4f5b6b]">
        <span>Lower risk</span>
        <span>Higher risk</span>
      </div>
    </div>
  );
}