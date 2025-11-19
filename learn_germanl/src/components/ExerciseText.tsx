"use client";

export default function ExerciseText({
    preparedText,
    inputs,
    answers,
    submitted,
    setInputs,
    inputRefs,
    handleFocus,
}: any) {
    const parts = preparedText.split("___");

    let blankIndex = 0;

    const textWithBlanks = parts.map((seg: string, i: number) => {
        if (i === parts.length - 1) return seg;

        const idx = blankIndex++;

        return (
            <span key={idx} className="inline">
                <span className="inline">{seg}</span>

                <input
                    ref={(el) => {
                        inputRefs.current[idx] = el;
                    }}
                    onFocus={() => handleFocus(idx)}
                    value={inputs[idx]}
                    onChange={(e) => {
                        const arr = [...inputs];
                        arr[idx] = e.target.value;
                        setInputs(arr);
                    }}
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    className={`border-b bg-transparent px-0 text-lg
            focus:outline-none
            inline-flex items-end shrink
            min-w-[40px]
            ${submitted
                            ? inputs[idx].toLowerCase() === answers[idx].toLowerCase()
                                ? "border-green-600"
                                : "border-red-600 text-red-600"
                            : "border-gray-400"
                        }`}
                />
            </span>
        );
    });

    return (
        <div className="p-6 rounded-xl bg-white shadow-md border border-gray-200">
            <p
                className="whitespace-normal break-words text-justify leading-9"
                style={{
                    textAlign: "justify",
                    textJustify: "inter-word",
                    wordBreak: "break-word",
                }}
            >
                {textWithBlanks}
            </p>
        </div>
    );
}
