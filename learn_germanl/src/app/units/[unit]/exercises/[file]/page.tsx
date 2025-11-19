import Exercise from "@/components/Exercise";
import fs from "fs";
import path from "path";

export default async function Page({ params }: { params: Promise<any> }) {
  const { unit, file } = await params;

  const filePath = path.join(
    process.cwd(),
    "units",
    unit,
    "exercises",
    file + ".json"
  );

  let raw = "";
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return <div style={{ color: "red" }}>File not found.</div>;
  }

  if (!raw.trim()) {
    return <div style={{ color: "red" }}>The file is empty.</div>;
  }

  const content = JSON.parse(raw);

  return (
    <div>
      <Exercise data={content} />
    </div>
  );
}
