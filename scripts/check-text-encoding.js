import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const checkedExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".md",
  ".ts",
  ".tsx",
]);

const ignoredDirs = new Set([
  ".git",
  ".storybook-static",
  "dist",
  "node_modules",
]);

const mojibakePatterns = [
  /\u0420[\u0403\u0405\u0406\u0408\u0409\u040A\u040C\u040E\u040F\u0453\u0454\u0455\u0456\u0458\u0459\u045A\u045C\u045E\u045F\u0490\u0491]/u,
  /\u0421[\u0402\u0403\u0404\u0405\u0406\u0407\u0408\u0409\u040A\u040B\u040C\u040E\u040F\u0452\u0453\u0454\u0455\u0456\u0457\u0458\u0459\u045A\u045B\u045C\u045E\u045F]/u,
  /В«|В»|В /u,
  /вЂ|вњ|рџ/u,
  /пїЅ/u,
  /�/u,
];

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...(await collectFiles(fullPath)));
      }
      continue;
    }

    if (entry.name === "check-text-encoding.js") {
      continue;
    }

    if (checkedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await collectFiles(rootDir);
  const issues = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    const pattern = mojibakePatterns.find((item) => item.test(content));

    if (pattern) {
      issues.push({
        file: path.relative(rootDir, file),
        marker: pattern.toString(),
      });
    }
  }

  if (issues.length > 0) {
    console.error("Text encoding check failed. Possible mojibake found:");
    for (const issue of issues) {
      console.error(`- ${issue.file}: ${issue.marker}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Text encoding check passed (${files.length} files).`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
