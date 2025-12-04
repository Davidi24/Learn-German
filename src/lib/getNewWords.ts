import fs from "fs";
import path from "path";

function getFirstLevel(rootPath: string) {
  const items = fs.readdirSync(rootPath);

  return items.map((item) => {
    const full = path.join(rootPath, item);
    const isDir = fs.lstatSync(full).isDirectory();

    return {
      name: item,
      path: full.replace(process.cwd(), ""),
      type: isDir ? "folder" : "file",
    };
  });
}

function buildTree(rootPath: string): any[] {
  const level = getFirstLevel(rootPath);

  return level.map((item) => {
    if (item.type === "folder") {
      return {
        ...item,
        children: buildTree(path.join(rootPath, item.name)),
      };
    }
    return item;
  });
}

export function getAllUnits() {
  const unitsRoot = path.join(process.cwd(), "units");
  return buildTree(unitsRoot);
}
