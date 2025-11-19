"use client";

import { useState, useRef } from "react";
import ExerciseText from "./ExerciseText";

type ExerciseProps = {
  data: {
    words: string[];
    text: string;
    answers: string[];
  };
};

export default function Exercise({ data }: ExerciseProps) {
  const { words, text, answers } = data;

  const [inputs, setInputs] = useState<string[]>(Array(answers.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const lastFocusedRef = useRef<number | null>(null);

  const handleFocus = (i: number) => {
    lastFocusedRef.current = i;
  };

  const insertChar = (char: string) => {
    const i = lastFocusedRef.current;
    if (i === null) return;

    const input = inputRefs.current[i];
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;

    const updated = inputs[i].slice(0, start) + char + inputs[i].slice(end);

    const arr = [...inputs];
    arr[i] = updated;
    setInputs(arr);

    setTimeout(() => {
      input.setSelectionRange(start + 1, start + 1);
      input.focus();
    }, 0);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);
  };

  const wrongCount = inputs.filter(
    (v, i) => v.toLowerCase() !== answers[i].toLowerCase()
  ).length;

  const restartAll = () => {
    setInputs(Array(answers.length).fill(""));
    setSubmitted(false);
    setShowResult(false);
  };

  const restartWrongOnly = () => {
    const arr = [...inputs];
    answers.forEach((ans, i) => {
      if (inputs[i].toLowerCase() !== ans.toLowerCase()) arr[i] = "";
    });
    setInputs(arr);
    setSubmitted(false);
    setShowResult(false);
  };

  const preparedText = text.replace(/#/g, "___").trim().replace(/\s+/g, " ");

  return (
    <div className="mx-auto p-6 space-y-8">
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm select-none">
        <h2 className="font-semibold mb-2">Wörter:</h2>

        <div className="flex flex-wrap gap-3 text-sm">
          {words.map((w) => {
            const used = inputs.some(
              (inp) => inp.toLowerCase().trim() === w.toLowerCase()
            );

            return (
              <span
                key={w}
                className={`px-3 py-1 bg-white rounded-md shadow 
                  ${used ? "text-red-500 line-through" : "text-gray-800"}`}
              >
                {w}
              </span>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border select-none">
        <div className="text-lg leading-relaxed">
          <ExerciseText
            preparedText={preparedText}
            inputs={inputs}
            answers={answers}
            submitted={submitted}
            setInputs={setInputs}
            inputRefs={inputRefs}
            handleFocus={handleFocus}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2">
          {["Ä", "Ö", "Ü", "ß", "ä", "ö", "ü"].map((char) => (
            <button
              key={char}
              onClick={() => insertChar(char)}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-sm border shadow-sm"
            >
              {char}
            </button>
          ))}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div>

      {/* ============================= */}
      {/*      RESULT   DIALOG MODAL     */}
      {/* ============================= */}
      {showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl border space-y-4 max-w-sm w-full text-center">
            <p className="font-medium text-xl">
              {wrongCount === 0
                ? "✔ Alles korrekt!"
                : `❌ ${wrongCount} Fehler`}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={restartWrongOnly}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
              >
                Weiter (nur falsche)
              </button>

              <button
                onClick={restartAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Neu starten
              </button>
            </div>

            <button
              onClick={() => setShowResult(false)}
              className="mt-3 px-4 py-1 text-gray-600 hover:text-gray-900 underline text-sm"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
