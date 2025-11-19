import fs from "fs";
import path from "path";

export default async function Page({ params }: { params: Promise<any> }) {
  const { unit, file } = await params;

  const filePath = path.join(
    process.cwd(),
    "units",
    unit,
    "newWords",
    file + ".json"
  );

  const raw = fs.readFileSync(filePath, "utf8");

  if (!raw.trim()) {
    return <div style={{ color: "red" }}>The file is empty.</div>;
  }

  const content = JSON.parse(raw);

  return <pre>{JSON.stringify(content, null, 2)}</pre>;
}
