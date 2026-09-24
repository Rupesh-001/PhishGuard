import React, { useMemo, useState } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { analyzeEmail } from "./utils/analyzeEmail";
import InputPanel from "./components/InputPanel";
import ReportPanel from "./components/ReportPanel";

export default function App() {
  const [emailText, setEmailText] = useState("");
  const [showAnnotated, setShowAnnotated] = useState(false);

  const result = useMemo(() => analyzeEmail(emailText), [emailText]);

  const caseNumber = useMemo(() => {
    const d = new Date();

    return `${String(d.getFullYear()).slice(2)}${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }, [emailText.length === 0]);

  return (
    <div className="app-shell">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="brand-row">
            <div className="brand-icon">
              <ShieldCheck size={22} strokeWidth={2.2} />
            </div>

            <div>
              <div className="brand-name">PhishGuard</div>
              <div className="brand-subtitle">Email security analyzer</div>
            </div>
          </div>

          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} />
              Smart phishing analysis
            </div>

            <h1>
              Check an email before
              <span> you trust it.</span>
            </h1>

            <p>
              Paste a suspicious email and PhishGuard will look for common
              phishing signals including spoofed senders, suspicious links,
              urgency tactics and credential requests.
            </p>
          </div>
        </header>

        {/* Main */}
        <main className="main-grid">
          <InputPanel
            emailText={emailText}
            setEmailText={setEmailText}
          />

          <ReportPanel
            result={result}
            emailText={emailText}
            caseNumber={caseNumber}
            showAnnotated={showAnnotated}
            setShowAnnotated={setShowAnnotated}
          />
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div>
            <ShieldCheck size={14} />
            Pattern-based analysis
          </div>

          <span>
            PhishGuard does not guarantee that an email is safe.
          </span>
        </footer>
      </div>
    </div>
  );
}