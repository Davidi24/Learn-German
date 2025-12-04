import fs from "fs";
import path from "path";
import VerbExercise from "@/components/VerbExercise";

export default async function Page({ params }: { params: Promise<any> }) {
  const { file } = await params;

  const filePath = path.join(
    process.cwd(),
    "units",
    "special",
    file + ".json"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.trim()) {
    return <div style={{ color: "red" }}>The file is empty.</div>;
  }

  const verbs = JSON.parse(raw);
  return <VerbExercise verbs={verbs} />;
}
