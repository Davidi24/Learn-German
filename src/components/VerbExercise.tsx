"use client";
import { useState, useRef } from "react";

export default function VerbExercise({ verbs }: { verbs: any[] }) {
  const [queue, setQueue] = useState([...verbs]);
  const [index, setIndex] = useState(0);

  const [inf, setInf] = useState("");
  const [ersie, setErsie] = useState("");
  const [perfekt, setPerfekt] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);
  const [autoNextMsg, setAutoNextMsg] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wrongOnce, setWrongOnce] = useState(false);

  const infRef = useRef<HTMLInputElement | null>(null);
  const ersieRef = useRef<HTMLInputElement | null>(null);
  const perfektRef = useRef<HTMLInputElement | null>(null);

  const current = queue[index];

  const cInf = current.verb;
  const cErsieFull = current.er_sie;
  const cErsie = cErsieFull.split(" ").slice(1).join(" ");
  const cPerfekt = current.perfekt;

  const okInf = inf.trim() === cInf.trim();
  const okErsie = ersie.trim() === cErsie.trim();
  const okPerfekt = perfekt.trim() === cPerfekt.trim();

  const allCorrect = okInf && okErsie && okPerfekt;

  const infColor = submitted ? (okInf ? "#28a745" : "#dc3545") : "#ccc";
  const ersieColor = submitted ? (okErsie ? "#28a745" : "#dc3545") : "#ccc";
  const perfektColor = submitted ? (okPerfekt ? "#28a745" : "#dc3545") : "#ccc";

  function submit() {
    if (!inf.trim() || !ersie.trim() || !perfekt.trim()) return;

    setSubmitted(true);

    if (allCorrect) {
      setAutoNextMsg(true);
      setTimeout(() => goNext(), 900);
    } else {
      if (!wrongOnce) {
        requeueWrongVerb();
        setWrongOnce(true);
      }
    }
  }

  function requeueWrongVerb() {
    const wrongVerb = queue[index];
    const newQueue = [...queue];

    let insertPos = index + 7;
    if (insertPos > newQueue.length) insertPos = newQueue.length;

    newQueue.splice(insertPos, 0, wrongVerb);

    setQueue(newQueue);
  }

  function goNext() {
    if (index >= queue.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    reset();
  }

  function reset() {
    setInf("");
    setErsie("");
    setPerfekt("");
    setSubmitted(false);
    setResultVisible(false);
    setAutoNextMsg(false);
    setWrongOnce(false);
    setTimeout(() => infRef.current?.focus(), 50);
  }

  function restartAll() {
    setQueue([...verbs]);
    setIndex(0);
    reset();
    setFinished(false);
  }

  const inputStyle = (color: string) => ({
    padding: "10px 14px",
    width: 230,
    borderRadius: 8,
    border: `2px solid ${color}`,
    fontSize: 16,
    marginRight: 20,
  });

  function handleEnter(e: any, field: string) {
    if (e.key !== "Enter") return;

    if (field === "inf") ersieRef.current?.focus();
    else if (field === "ersie") perfektRef.current?.focus();
    else if (field === "perfekt") submit();
  }

  if (finished) {
    return (
      <div style={{ padding: 40, fontFamily: "Inter, sans-serif", fontSize: 22 }}>
        🎉 <b>You finished all verbs!</b>
        <br /><br />
        <button
          onClick={restartAll}
          style={{
            padding: "12px 26px",
            background: "#007bff",
            color: "white",
            borderRadius: 8,
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          Do it again
        </button>
      </div>
    );
  }

  // DARK MODE FRIENDLY RESULT BOX
  const resultBoxStyle: React.CSSProperties = {
    padding: 20,
    borderRadius: 10,
    width: "fit-content",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    fontSize: 18,
    background: "var(--result-bg)",
    color: "var(--result-text)",
  };

  // Dynamic CSS vars for dark/light mode
  const root = typeof window !== "undefined" ? document.documentElement : null;
  if (root) {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.style.setProperty("--result-bg", dark ? "#1f1f1f" : "#f8f9fa");
    root.style.setProperty("--result-text", dark ? "#e8e8e8" : "#111");
  }

  return (
    <div style={{ padding: 30, fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ marginBottom: 15, fontSize: 26 }}>Partizip II Übung</h2>

      <div style={{ marginBottom: 25, fontSize: 20 }}>
        <b>Übersetzung:</b> {current.translation}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 25,
          flexWrap: "wrap",
        }}
      >
        <input
          ref={infRef}
          placeholder="Infinitiv"
          value={inf}
          onChange={(e) => setInf(e.target.value)}
          onKeyDown={(e) => handleEnter(e, "inf")}
          style={inputStyle(infColor)}
        />

        <input
          ref={ersieRef}
          placeholder="er/sie/es"
          value={ersie}
          onChange={(e) => setErsie(e.target.value)}
          onKeyDown={(e) => handleEnter(e, "ersie")}
          style={inputStyle(ersieColor)}
        />

        <input
          ref={perfektRef}
          placeholder="Partizip II"
          value={perfekt}
          onChange={(e) => setPerfekt(e.target.value)}
          onKeyDown={(e) => handleEnter(e, "perfekt")}
          style={inputStyle(perfektColor)}
        />
      </div>

      {autoNextMsg && (
        <div style={{ color: "#28a745", fontSize: 18, marginBottom: 15 }}>
          ✔ Correct! Moving to next…
        </div>
      )}

      <div style={{ display: "flex", gap: 15, marginBottom: 30 }}>
        <button
          onClick={submit}
          style={{
            padding: "10px 22px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Submit
        </button>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setResultVisible((prev) => !prev)}
          style={{
            padding: "10px 22px",
            background: "#17a2b8",
            color: "white",
            borderRadius: 8,
            border: "none",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {resultVisible ? "Hide Result" : "Check Result"}
        </button>
      </div>

      {resultVisible && (
        <div style={resultBoxStyle}>
          <div><b>Infinitiv:</b> {cInf}</div>
          <div><b>er/sie/es:</b> {cErsieFull}</div>
          <div><b>Partizip II:</b> {cPerfekt}</div>
        </div>
      )}
    </div>
  );
}
