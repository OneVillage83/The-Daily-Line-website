import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const IGNORED_DIRECTORIES = new Set([".git", ".next", "node_modules", "coverage", "out", "build"]);
const STRICT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".css", ".yml", ".yaml"]);
const TEXT_EXTENSIONS = new Set([...STRICT_EXTENSIONS, ".md"]);
const ROOT_TEXT_FILES = new Set(["AGENTS.md", "README.md"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (IGNORED_DIRECTORIES.has(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    const extension = path.extname(entry.name);
    if (TEXT_EXTENSIONS.has(extension) || ROOT_TEXT_FILES.has(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const failures = [];
const files = await collectFiles(ROOT);

for (const file of files) {
  const relative = path.relative(ROOT, file);
  const contents = await readFile(file, "utf8");

  if (contents.startsWith("\uFEFF")) {
    failures.push(`${relative}: UTF-8 BOM is not allowed`);
  }

  if (contents.length > 0 && !contents.endsWith("\n")) {
    failures.push(`${relative}: file must end with a newline`);
  }

  if (STRICT_EXTENSIONS.has(path.extname(file))) {
    const lines = contents.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (/[ \t]+$/.test(line)) {
        failures.push(`${relative}:${index + 1}: trailing whitespace`);
      }
    });
  }
}

if (failures.length > 0) {
  console.error("Repository format checks failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Repository format checks passed for ${files.length} text files.`);
