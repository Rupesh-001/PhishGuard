import React from "react";
import {
  ChevronDown,
  FileSearch,
  ShieldCheck,
} from "lucide-react";

import {
  MOSS,
  PAPER_DIM,
  SEVERITY_COLOR,
  SEVERITY_LABEL,
} from "../constants";

import StampBadge from "./StampBadge";
import RiskMeter from "./RiskMeter";
import AnnotatedText from "./AnnotatedText";

export default function ReportPanel({
  result,
  emailText,
  caseNumber,
  showAnnotated,
  setShowAnnotated,
}) {
  return (
    <section className="ui-panel p-5 md:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#172031] border border-[#273448] flex items-center justify-center">
            <FileSearch size={17} className="text-[#8fb7ff]" />
          </div>

          <div>
            <h2 className="m-0 text-[14px] font-semibold text-[#edf2f8]">
              Analysis result
            </h2>

            <p className="m-0 mt-0.5 text-[11px] text-[#667286]">
              Automated phishing assessment
            </p>
          </div>
        </div>

        {result && <StampBadge level={result.level} />}
      </div>

      {/* Case */}
      <div className="mb-5 flex items-center justify-between rounded-lg border border-[#1f2935] bg-[#0c1118] px-3 py-2.5">
        <span className="text-[10px] uppercase tracking-[0.1em] text-[#566274]">
          Analysis ID
        </span>

        <span className="font-mono text-[10px] text-[#778396]">
          {caseNumber}
        </span>
      </div>

      {/* Empty state */}
      {!result && (
        <div className="rounded-2xl border border-dashed border-[#293443] bg-[#0c1118] px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#151f2d] border border-[#26364c]">
            <FileSearch size={21} className="text-[#6f91c2]" />
          </div>

          <h3 className="m-0 text-[14px] font-semibold text-[#dce3ec]">
            Waiting for an email
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed text-[#667386]">
            Paste an email or load one of the sample messages to start the
            security analysis.
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="fade-up">
          <RiskMeter
            score={result.score}
            level={result.level}
          />

          {/* Indicator heading */}
          <div className="mt-5 mb-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-[#596679]">
                Detected signals
              </div>

              <div className="mt-1 text-[13px] font-medium text-[#cbd3de]">
                {result.flags.length} indicator
                {result.flags.length === 1 ? "" : "s"} found
              </div>
            </div>

            <div className="rounded-full bg-[#151d27] px-2.5 py-1 text-[9px] text-[#657184]">
              Pattern scan
            </div>
          </div>

          {/* No flags */}
          {result.flags.length === 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-[#294337] bg-[#101a16] p-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#183027]">
                <ShieldCheck
                  size={15}
                  color={MOSS}
                />
              </div>

              <div>
                <div className="text-[12px] font-semibold text-[#8cc2a5]">
                  No common phishing patterns detected
                </div>

                <p className="m-0 mt-1 text-[11.5px] leading-relaxed text-[#6f8d7d]">
                  This does not guarantee the email is safe. The analyzer
                  checks for known patterns only.
                </p>
              </div>
            </div>
          )}

          {/* Flags */}
          <div className="grid gap-2.5">
            {result.flags.map((f, i) => (
              <div
                key={f.id}
                className="
                  group
                  flex gap-3
                  rounded-xl
                  border border-[#222d3a]
                  bg-[#0d131b]
                  p-3.5
                  transition
                  hover:border-[#303d4e]
                  hover:bg-[#101720]
                "
                style={{
                  borderLeft: `3px solid ${SEVERITY_COLOR[f.severity]}`,
                  animation: "fadeUp 0.25s ease both",
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                {/* Number */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#151d27] font-mono text-[9px] text-[#687588]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12.5px] font-semibold text-[#d8dfe8]">
                      {f.title}
                    </span>

                    <span
                      className="rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em]"
                      style={{
                        color: SEVERITY_COLOR[f.severity],
                        background: `${SEVERITY_COLOR[f.severity]}12`,
                        border: `1px solid ${SEVERITY_COLOR[f.severity]}30`,
                      }}
                    >
                      {SEVERITY_LABEL[f.severity]}
                    </span>
                  </div>

                  <p className="m-0 mt-1 text-[11px] leading-relaxed text-[#687587]">
                    {f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Annotated message */}
          <button
            onClick={() =>
              setShowAnnotated((s) => !s)
            }
            className="
              mt-4
              flex w-full items-center justify-between
              rounded-xl
              border border-[#222d3a]
              bg-[#0d131b]
              px-4 py-3
              text-left
              transition
              hover:border-[#354256]
              hover:bg-[#101720]
            "
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#172131]">
                <FileSearch
                  size={14}
                  className="text-[#7598cf]"
                />
              </span>

              <span>
                <span className="block text-[11px] font-semibold text-[#cbd4df]">
                  Annotated message
                </span>

                <span className="block mt-0.5 text-[10px] text-[#596678]">
                  Highlight detected suspicious content
                </span>
              </span>
            </span>

            <ChevronDown
              size={15}
              className={`text-[#647184] transition-transform ${
                showAnnotated ? "rotate-180" : ""
              }`}
            />
          </button>

          {showAnnotated && (
            <div className="mt-2.5 rounded-xl border border-[#242e3b] bg-[#ece7da] p-4 max-h-[300px] overflow-auto">
              <AnnotatedText
                text={emailText}
                ranges={result.ranges}
              />
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-4 mb-0 text-[9.5px] leading-relaxed text-[#4f5c6d]">
            Analysis is based on pattern matching and should be treated as a
            security aid, not a definitive verdict.
          </p>
        </div>
      )}
    </section>
  );
}