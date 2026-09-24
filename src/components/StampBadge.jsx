import React from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

export default function StampBadge({ level }) {
  const config = {
    high: {
      text: "High risk",
      icon: ShieldAlert,
      color: "#e47770",
      bg: "rgba(228, 119, 112, 0.08)",
      border: "rgba(228, 119, 112, 0.22)",
    },

    medium: {
      text: "Caution",
      icon: AlertTriangle,
      color: "#d9aa58",
      bg: "rgba(217, 170, 88, 0.08)",
      border: "rgba(217, 170, 88, 0.22)",
    },

    low: {
      text: "Likely safe",
      icon: CheckCircle2,
      color: "#70b28f",
      bg: "rgba(112, 178, 143, 0.08)",
      border: "rgba(112, 178, 143, 0.22)",
    },
  }[level];

  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
      style={{
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.border}`,
      }}
    >
      <Icon size={13} />
      {config.text}
    </div>
  );
}