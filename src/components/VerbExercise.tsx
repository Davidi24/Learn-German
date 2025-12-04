"use client";
import { useState } from "react";

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
      setTimeout(() => goNextCorrect(), 800);
    } else {
      requeueWrongVerb();
      setTimeout(() => goNextWrong(), 800);
    }
  }

  function requeueWrongVerb() {
    const wrongVerb = queue[index];

    const newQueue = [...queue];
    newQueue.splice(index, 1);

    let insertPos = index + 7;
    if (insertPos > newQueue.length) insertPos = newQueue.length;

    newQueue.splice(insertPos, 0, wrongVerb);

    setQueue(newQueue);
  }

  function goNextCorrect() {
    if (index >= queue.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    reset();
  }

  function goNextWrong() {
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
          placeholder="Infinitiv"
          value={inf}
          onChange={(e) => setInf(e.target.value)}
          style={inputStyle(infColor)}
        />

        <input
          placeholder="er/sie/es"
          value={ersie}
          onChange={(e) => setErsie(e.target.value)}
          style={inputStyle(ersieColor)}
        />

        <input
          placeholder="Partizip II"
          value={perfekt}
          onChange={(e) => setPerfekt(e.target.value)}
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

        <button
          onClick={() => setResultVisible(true)}
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
          Check Result
        </button>
      </div>

      {resultVisible && (
        <div
          style={{
            padding: 20,
            borderRadius: 10,
            background: "#f8f9fa",
            width: "fit-content",
            boxShadow: "0 0 10px rgba(0,0,0,0.08)",
            fontSize: 18,
          }}
        >
          <div><b>Infinitiv:</b> {cInf}</div>
          <div><b>er/sie/es:</b> {cErsieFull}</div>
          <div><b>Partizip II:</b> {cPerfekt}</div>
        </div>
      )}
    </div>
  );
}
