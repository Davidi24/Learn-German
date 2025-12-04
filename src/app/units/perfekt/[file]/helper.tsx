"use client";

import { useState } from "react";
import VerbExercise from "@/components/VerbExercise";
import ChooseVerb from "@/components/ChooseVerb";

export default function ClientWrapper({ verbs }: { verbs: any }) {
  console.log("ClientWrapper render");

  const [data, setData] = useState(verbs);
  const [show, setShow] = useState<"exercise" | "div">("exercise");
  const [seed, setSeed] = useState(0);

  const shuffleData = () => {
    const arr = [...data];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setData(arr);
    setSeed((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="flex gap-4">
        <button
          onClick={() => setShow("exercise")}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Exercise
        </button>

        <button
          onClick={() => setShow("div")}
          className="px-6 py-3 rounded-xl bg-gray-700 text-white font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Other
        </button>

        <button
          onClick={shuffleData}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition"
        >
          Shuffle
        </button>
      </div>

      {show === "exercise" && (
        <VerbExercise key={seed} verbs={data} />
      )}

      {show === "div" && (
        <ChooseVerb key={seed} verbs={data} />
      )}
    </div>
  );
}
