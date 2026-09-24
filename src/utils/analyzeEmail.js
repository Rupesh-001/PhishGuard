import { BRANDS, REGEX_FLAGS, SEVERITY_WEIGHT, SHORTENERS } from "../constants";

function extractHeaderLine(text, name) {
  const m = text.match(new RegExp(`^${name}:\\s*(.+)$`, "im"));
  if (!m) return null;
  return { full: m[0], value: m[1].trim(), index: m.index, length: m[0].length };
}

function parseAddress(line) {
  if (!line) return { displayName: "", domain: "" };
  const angleMatch = line.match(/<([^>]+)>/);
  const email = angleMatch ? angleMatch[1] : line;
  const displayName = angleMatch
    ? line.slice(0, angleMatch.index).replace(/["']/g, "").trim()
    : "";
  const domainMatch = email.match(/@([\w.-]+)/);
  return { displayName, domain: domainMatch ? domainMatch[1].toLowerCase() : "" };
}

export function analyzeEmail(text) {
  if (!text || !text.trim()) return null;

  const flags = [];
  const ranges = [];

  REGEX_FLAGS.forEach((def) => {
    let matches = [];
    def.patterns.forEach((p) => {
      const re = new RegExp(p.source, p.flags.includes("g") ? p.flags : p.flags + "g");
      let m;
      while ((m = re.exec(text))) {
        matches.push({ index: m.index, length: m[0].length });
        if (m[0].length === 0) re.lastIndex++;
      }
    });
    if (matches.length) {
      flags.push({ ...def, count: matches.length });
      matches.forEach((mm) => ranges.push({ ...mm, severity: def.severity }));
    }
  });

  const fromLine = extractHeaderLine(text, "From");
  const replyToLine = extractHeaderLine(text, "Reply-To");
  const from = parseAddress(fromLine ? fromLine.value : "");
  const replyTo = parseAddress(replyToLine ? replyToLine.value : "");

  if (fromLine && from.displayName) {
    const lowerDisplay = from.displayName.toLowerCase();
    for (const [brand, officialDomain] of Object.entries(BRANDS)) {
      if (lowerDisplay.includes(brand)) {
        const domainMatchesBrand =
          from.domain === officialDomain || from.domain.endsWith("." + officialDomain);
        if (!domainMatchesBrand) {
          flags.push({
            id: "display-spoof",
            severity: "high",
            title: "Sender name impersonates a brand",
            detail: `The display name mentions "${from.displayName}" but the sending address is on "${
              from.domain || "an unknown domain"
            }", not ${officialDomain}.`,
            count: 1,
          });
          ranges.push({ index: fromLine.index, length: fromLine.length, severity: "high" });
        }
        break;
      }
    }
  }

  if (fromLine && replyToLine && from.domain && replyTo.domain && from.domain !== replyTo.domain) {
    flags.push({
      id: "reply-to-mismatch",
      severity: "medium",
      title: "Reply-To domain differs from the From domain",
      detail: `Replies are routed to "${replyTo.domain}" even though the message claims to be from "${from.domain}".`,
      count: 1,
    });
    ranges.push({ index: replyToLine.index, length: replyToLine.length, severity: "medium" });
  }

  const urlRegex = /https?:\/\/([^\s\/)'"<>]+)([^\s)'"<>]*)/gi;
  let urlMatch;
  let flaggedIp = false;
  let flaggedShortener = false;
  let flaggedLookalike = false;
  while ((urlMatch = urlRegex.exec(text))) {
    const fullMatch = urlMatch[0];
    let domain = urlMatch[1].toLowerCase().replace(/^www\./, "");

    if (!flaggedIp && /^\d{1,3}(\.\d{1,3}){3}/.test(domain)) {
      flags.push({
        id: "ip-url",
        severity: "high",
        title: "Link points to a raw IP address",
        detail:
          "Legitimate services almost never link directly to a numeric IP address instead of a domain name.",
        count: 1,
      });
      ranges.push({ index: urlMatch.index, length: fullMatch.length, severity: "high" });
      flaggedIp = true;
    }

    if (!flaggedShortener && SHORTENERS.some((s) => domain === s || domain.endsWith("." + s))) {
      flags.push({
        id: "shortener",
        severity: "medium",
        title: "Link uses a URL shortener",
        detail: "Shortened links hide the real destination until after you click.",
        count: 1,
      });
      ranges.push({ index: urlMatch.index, length: fullMatch.length, severity: "medium" });
      flaggedShortener = true;
    }

    if (!flaggedLookalike) {
      for (const [brand, officialDomain] of Object.entries(BRANDS)) {
        if (
          domain.includes(brand) &&
          domain !== officialDomain &&
          !domain.endsWith("." + officialDomain)
        ) {
          flags.push({
            id: "lookalike-domain",
            severity: "high",
            title: "Link domain impersonates a known brand",
            detail: `The link domain "${domain}" references "${brand}" but is not ${officialDomain}.`,
            count: 1,
          });
          ranges.push({ index: urlMatch.index, length: fullMatch.length, severity: "high" });
          flaggedLookalike = true;
          break;
        }
      }
    }
  }

  const anchorRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let anchorMatch;
  let flaggedAnchor = false;
  while ((anchorMatch = anchorRegex.exec(text))) {
    const anchorText = anchorMatch[1];
    const hrefDomainMatch = anchorMatch[2].match(/https?:\/\/([^\s\/)'"<>]+)/i);
    const hrefDomain = hrefDomainMatch ? hrefDomainMatch[1].toLowerCase() : "";
    const looksLikeUrlText = /\.[a-z]{2,}/i.test(anchorText);
    if (looksLikeUrlText && !anchorText.toLowerCase().includes(hrefDomain.split(".")[0])) {
      if (!flaggedAnchor) {
        flags.push({
          id: "anchor-mismatch",
          severity: "high",
          title: "Link text doesn't match where it goes",
          detail: `The link is labeled "${anchorText}" but actually points to "${hrefDomain}".`,
          count: 1,
        });
        ranges.push({ index: anchorMatch.index, length: anchorMatch[0].length, severity: "high" });
        flaggedAnchor = true;
      }
    }
  }

  let score = 0;
  flags.forEach((f) => {
    const base = SEVERITY_WEIGHT[f.severity];
    const bonus = Math.min((f.count || 1) - 1, 3) * 3;
    score += base + bonus;
  });
  score = Math.max(0, Math.min(100, score));

  let level = "low";
  if (score >= 55) level = "high";
  else if (score >= 25) level = "medium";

  ranges.sort((a, b) => a.index - b.index);
  const merged = [];
  let lastEnd = -1;
  ranges.forEach((r) => {
    if (r.index >= lastEnd) {
      merged.push({ start: r.index, end: r.index + r.length, severity: r.severity });
      lastEnd = r.index + r.length;
    }
  });

  return { flags, score, level, ranges: merged };
}