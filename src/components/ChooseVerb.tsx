"use client";
import { useState } from "react";

export default function ChooseVerb({ verbs }: { verbs: any[] }) {
  const [queue, setQueue] = useState([...verbs]);
  const [index, setIndex] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [autoNextMsg, setAutoNextMsg] = useState(false);
  const [wrongOnce, setWrongOnce] = useState(false);
  const [finished, setFinished] = useState(false);

  const v = queue[index];

  const correctAux = v.perfekt.trim().startsWith("ist")
    ? "sein"
    : v.perfekt.trim().startsWith("hat")
      ? "haben"
      : "haben";

  function choose(aux: "sein" | "haben") {
    if (aux === correctAux) {
      setFeedback("✔ Correct!");
      setAutoNextMsg(true);
      setTimeout(() => goNext(), 800);
    } else {
      setFeedback("✘ Wrong");

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

    setIndex((prev) => prev + 1);
    reset();
  }

  function reset() {
    setFeedback("");
    setAutoNextMsg(false);
    setWrongOnce(false);
  }

  function restart() {
    setQueue([...verbs]);
    setIndex(0);
    reset();
    setFinished(false);
  }

  if (finished) {
    return (
      <div
        style={{ padding: 40, fontFamily: "Inter, sans-serif", fontSize: 22 }}
      >
        🎉 You finished!
        <br />
        <br />
        <button
          onClick={restart}
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
    <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>
      <div className="flex w-full justify-center">
        <div style={{ fontSize: 28, marginBottom: 20 }}>{v.verb}</div>
      </div>
      <div style={{ display: "flex", gap: 20, marginBottom: 25 }}>
        <button
          onClick={() => choose("sein")}
          style={{
            padding: "12px 30px",
            fontSize: 22,
            background: "#6f42c1",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          sein
        </button>

        <button
          onClick={() => choose("haben")}
          style={{
            padding: "12px 30px",
            fontSize: 22,
            background: "#20c997",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          haben
        </button>
      </div>

      <div style={{ fontSize: 22, height: 30 }}>{feedback}</div>

      {autoNextMsg && (
        <div style={{ color: "#28a745", fontSize: 18 }}>
          ✔ Correct! Moving to next…
        </div>
      )}
    </div>
  );
}
