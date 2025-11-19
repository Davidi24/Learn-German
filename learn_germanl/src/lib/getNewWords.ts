import fs from "fs";
import path from "path";

export function getAllUnits() {
  const unitsRoot = path.join(process.cwd(), "units");

  const unitFolders = fs.readdirSync(unitsRoot); // ["unit_1", "unit_2", ...]

  return unitFolders.map((unitName) => {
    const unitPath = path.join(unitsRoot, unitName);

    // NEW WORD FILES
    const newWordsDir = path.join(unitPath, "newWords");
    const newWordsFiles = fs.existsSync(newWordsDir)
      ? fs.readdirSync(newWordsDir).map((name) => ({
          title: name.replace(".json", ""),
          icon: "file",
          path: `/units/${unitName}/newWords/${name.replace(".json", "")}`,
        }))
      : [];

    // EXERCISE FILES
    const exercisesDir = path.join(unitPath, "exercises");
    const exerciseFiles = fs.existsSync(exercisesDir)
      ? fs.readdirSync(exercisesDir).map((name) => ({
          title: name.replace(".json", ""),
          icon: "file",
          path: `/units/${unitName}/exercises/${name.replace(".json", "")}`,
        }))
      : [];

    return {
      title: unitName.replace("_", " ").replace("unit ", "Unit "),
      icon: "folder",
      path: `/units/${unitName}`,
      files: newWordsFiles,
      exercises: exerciseFiles,
    };
  });
}
