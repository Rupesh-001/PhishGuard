export const INK = "#14181F";
export const PANEL = "#1C222C";
export const LINE = "#333B48";
export const PAPER = "#ECE7DA";
export const PAPER_DIM = "#DCD6C5";
export const AMBER = "#D9A441";
export const RUST = "#BD4B3C";
export const MOSS = "#4C8C6B";
export const ASH = "#8B93A1";

export const MONO =
  "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, Consolas, monospace";
export const SANS = "ui-sans-serif, Inter, system-ui, -apple-system, sans-serif";

export const SEVERITY_COLOR = { high: RUST, medium: AMBER, low: MOSS };
export const SEVERITY_LABEL = { high: "high", medium: "medium", low: "low" };
export const SEVERITY_WEIGHT = { high: 22, medium: 12, low: 6 };

export const BRANDS = {
  paypal: "paypal.com",
  amazon: "amazon.com",
  apple: "apple.com",
  microsoft: "microsoft.com",
  netflix: "netflix.com",
  google: "google.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  linkedin: "linkedin.com",
  chase: "chase.com",
  wellsfargo: "wellsfargo.com",
  bankofamerica: "bankofamerica.com",
  irs: "irs.gov",
  dhl: "dhl.com",
  fedex: "fedex.com",
  ups: "ups.com",
  dropbox: "dropbox.com",
  docusign: "docusign.com",
};

export const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "ow.ly",
  "is.gd",
  "buff.ly",
  "rebrand.ly",
  "cutt.ly",
];

export const REGEX_FLAGS = [
  {
    id: "urgency",
    severity: "medium",
    title: "Urgency or pressure language",
    detail:
      "Phishing messages create false urgency so you act before thinking it through.",
    patterns: [
      /act\s+now/i,
      /verify\s+(your|the)\s+account/i,
      /account\s+(has\s+been\s+|will\s+be\s+)?suspend\w*/i,
      /immediate(ly)?\s+action/i,
      /click\s+here/i,
      /limited\s+time/i,
      /confirm\s+your\s+identity/i,
      /unusual\s+activity/i,
      /account\s+will\s+be\s+(closed|locked|terminated|deactivated)/i,
      /final\s+notice/i,
      /within\s+24\s+hours/i,
      /avoid\s+(suspension|termination)/i,
      /urgent(ly)?\s+response\s+required/i,
    ],
  },
  {
    id: "credential-request",
    severity: "high",
    title: "Asks for sensitive credentials or payment details",
    detail:
      "Legitimate services almost never ask you to send a password or card number by email.",
    patterns: [
      /\bpassword\b/i,
      /social\s+security\s+number|\bssn\b/i,
      /credit\s+card\s*(number)?/i,
      /\bpin\s*(code|number)?\b/i,
      /login\s+credentials/i,
      /update\s+your\s+payment/i,
      /banking\s+details/i,
      /security\s+code/i,
      /wire\s+transfer/i,
    ],
  },
  {
    id: "generic-greeting",
    severity: "low",
    title: "Generic greeting instead of your name",
    detail: "Mass phishing campaigns rarely know the recipient's real name.",
    patterns: [
      /dear\s+(customer|user|valued\s+customer|member|account\s+holder)/i,
      /dear\s+sir\s*\/\s*madam/i,
    ],
  },
  {
    id: "threat-legal",
    severity: "medium",
    title: "Threatens legal action or permanent loss of access",
    detail: "Threats are a pressure tactic meant to short-circuit careful judgment.",
    patterns: [
      /legal\s+action/i,
      /permanently\s+(disabled|deleted|closed)/i,
      /failure\s+to\s+comply/i,
      /suspend\w*\s+permanently/i,
    ],
  },
  {
    id: "exec-attachment",
    severity: "high",
    title: "Mentions a risky attachment type",
    detail:
      "Executable, script, or macro-enabled attachments are common malware delivery methods.",
    patterns: [/\.(exe|scr|js|jar|bat|cmd|vbs|ps1)\b/i],
  },
];

export const SAMPLE_PHISHING = `From: "PayPal Security" <account-alert@paypa1-secure.com>
Reply-To: recover@verify-support.net
Subject: URGENT: Unusual activity detected, verify your account

Dear valued customer,

We detected unusual activity on your account. Your account will be suspended within 24 hours unless you verify your identity immediately.

Click here to confirm your identity and update your payment details: http://192.168.4.22/paypal/login

If you do not act now, your account will be permanently closed and further legal action may be taken.

PayPal Security Team`;

export const SAMPLE_LEGIT = `From: "Alicia Chen" <alicia.chen@acmewidgets.com>
Subject: Notes from today's planning meeting

Hi team,

Thanks for jumping on the call earlier. Attaching the updated roadmap doc and a summary of what we agreed on for next quarter.

Let me know if I missed anything, happy to adjust before Friday's review.

Best,
Alicia`;