import React from "react";
import { SEVERITY_COLOR } from "../constants";

export default function AnnotatedText({ text, ranges }) {
  const preClass = "whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-[#3A362C] m-0";

  if (!ranges.length) {
    return <pre className={preClass}>{text}</pre>;
  }

  const segments = [];
  let cursor = 0;
  ranges.forEach((r) => {
    if (r.start > cursor) segments.push({ text: text.slice(cursor, r.start), mark: null });
    segments.push({ text: text.slice(r.start, r.end), mark: r.severity });
    cursor = r.end;
  });
  if (cursor < text.length) segments.push({ text: text.slice(cursor), mark: null });

  return (
    <pre className={preClass}>
      {segments.map((s, i) =>
        s.mark ? (
          <mark
            key={i}
            className="rounded-sm px-0.5"
            style={{
              background: `${SEVERITY_COLOR[s.mark]}3a`,
              color: "#2A2620",
              borderBottom: `2px solid ${SEVERITY_COLOR[s.mark]}`,
            }}
          >
            {s.text}
          </mark>
        ) : (
          <React.Fragment key={i}>{s.text}</React.Fragment>
        )
      )}
    </pre>
  );
}