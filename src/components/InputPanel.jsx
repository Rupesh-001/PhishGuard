import React from "react";
import {
  ClipboardCheck,
  Eraser,
  FileWarning,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { SAMPLE_LEGIT, SAMPLE_PHISHING } from "../constants";

export default function InputPanel({ emailText, setEmailText }) {
  return (
    <section className="ui-panel p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#182131] border border-[#273448] flex items-center justify-center">
            <Mail size={17} className="text-[#8fb7ff]" />
          </div>

          <div>
            <h2 className="m-0 text-[14px] font-semibold text-[#edf2f8]">
              Analyze an email
            </h2>

            <p className="m-0 mt-0.5 text-[11px] text-[#667286]">
              Paste the complete message below
            </p>
          </div>
        </div>

        <span className="hidden sm:block text-[10px] uppercase tracking-[0.12em] text-[#586577]">
          Input
        </span>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder={`Paste the email here...

From: "Example" <name@example.com>
Subject: ...

Message body...`}
          className="
            w-full
            min-h-[320px]
            resize-y
            rounded-xl
            bg-[#0c1118]
            border border-[#222d3b]
            p-4
            text-[#dce3ed]
            font-mono
            text-[12px]
            leading-[1.7]
            outline-none
            placeholder:text-[#4e5a6b]
            transition
            focus:border-[#547fbd]
            focus:ring-4
            focus:ring-[#547fbd]/10
          "
        />

        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-[10px] text-[#465264]">
            {emailText.length} characters
          </span>
        </div>
      </div>

      {/* Samples */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => setEmailText(SAMPLE_PHISHING)}
          className="
            inline-flex items-center gap-1.5
            rounded-lg
            border border-[#34313a]
            bg-[#17151a]
            px-3 py-2
            text-[11px]
            font-medium
            text-[#dc7770]
            transition
            hover:border-[#78433f]
            hover:bg-[#1b171c]
            active:scale-[0.98]
          "
        >
          <FileWarning size={13} />
          Phishing sample
        </button>

        <button
          onClick={() => setEmailText(SAMPLE_LEGIT)}
          className="
            inline-flex items-center gap-1.5
            rounded-lg
            border border-[#273a34]
            bg-[#121a17]
            px-3 py-2
            text-[11px]
            font-medium
            text-[#72b293]
            transition
            hover:border-[#3d6958]
            hover:bg-[#15201b]
            active:scale-[0.98]
          "
        >
          <ShieldCheck size={13} />
          Safe sample
        </button>

        <button
          onClick={() => setEmailText("")}
          className="
            inline-flex items-center gap-1.5
            rounded-lg
            border border-[#252e3a]
            bg-[#12171e]
            px-3 py-2
            text-[11px]
            font-medium
            text-[#7c8797]
            transition
            hover:border-[#3a4657]
            hover:text-[#a8b2c1]
            active:scale-[0.98]
          "
        >
          <Eraser size={13} />
          Clear
        </button>
      </div>

      {/* Checklist */}
      <div className="mt-5 rounded-xl border border-[#202a37] bg-[#0d131b] p-4">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardCheck size={15} className="text-[#7598cb]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8793a5]">
            Quick safety checklist
          </span>
        </div>

        <div className="grid gap-2.5">
          {[
            "Check the sender's actual domain.",
            "Hover links before opening them.",
            "Never send passwords or card details by email.",
            "Be cautious with urgent threats or deadlines.",
            "Contact the company through a known channel if unsure.",
          ].map((item, index) => (
            <div
              key={item}
              className="flex gap-2.5 text-[11.5px] leading-relaxed text-[#707d8e]"
            >
              <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#172232] text-[9px] text-[#7196cf]">
                {index + 1}
              </span>

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}