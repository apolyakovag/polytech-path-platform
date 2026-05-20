import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const componentsDir = path.join(rootDir, "src", "components");
const storiesDir = path.join(rootDir, "src", "stories");
const publicIndexPath = path.join(rootDir, "src", "index.ts");
const componentsIndexPath = path.join(rootDir, "src", "components", "index.ts");
const outputPath = path.join(rootDir, "docs", "figma-component-connections.md");

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readIfExists(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

function hasComponentExport(indexContent, componentName) {
  const escapedName = componentName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const componentPathPattern = new RegExp(
    `from\\s+["']\\.\\/components\\/${escapedName}(?:\\/[^"']*)?["']`
  );
  const localPathPattern = new RegExp(
    `from\\s+["']\\.\\/${escapedName}(?:\\/[^"']*)?["']`
  );

  return (
    componentPathPattern.test(indexContent) || localPathPattern.test(indexContent)
  );
}

function statusLabel(hasDocs, hasFigma) {
  if (hasDocs && hasFigma) return "готово";
  if (hasDocs) return "только docs";
  if (hasFigma) return "только figma.js";
  return "не начато";
}

function issueLabel({ hasDocs, hasFigma, hasRuntime }) {
  const issues = [];

  if (!hasDocs) issues.push("нет docs");
  if (!hasFigma) issues.push("нет figma.js");
  if (!hasRuntime) issues.push("нет runtime");

  return issues.length ? issues.join(", ") : "ok";
}

function mark(value) {
  return value ? "да" : "нет";
}

function createMarkdown(rows) {
  const total = rows.length;
  const connected = rows.filter((row) => row.status === "готово").length;
  const docsOnly = rows.filter((row) => row.status === "только docs").length;
  const figmaOnly = rows.filter((row) => row.status === "только figma.js").length;
  const notStarted = rows.filter((row) => row.status === "не начато").length;

  const lines = [
    "# Статус связки компонентов с Figma",
    "",
    "Этот файл показывает, у каких компонентов уже есть Figma-facing артефакты:",
    "",
    "- `<Component>.docs.md` для документации и design-to-code mapping;",
    "- `<Component>.figma.js` для Code Connect в Figma Dev Mode.",
    "",
    "Обновить файл можно командой:",
    "",
    "```bash",
    "npm run figma:status:write",
    "```",
    "",
    `Итого: ${connected}/${total} готово, ${docsOnly} только docs, ${figmaOnly} только figma.js, ${notStarted} не начато.`,
    "",
    "| Компонент | Публичный export | Runtime | Story | Docs | figma.js | Статус | Что не хватает |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const row of rows) {
    lines.push(
      `| ${row.component} | ${mark(row.publicExport)} | ${mark(row.hasRuntime)} | ${mark(row.hasStory)} | ${mark(row.hasDocs)} | ${mark(row.hasFigma)} | ${row.status} | ${row.issues} |`
    );
  }

  lines.push("");

  return lines.join("\n");
}

async function main() {
  if (!(await pathExists(componentsDir))) {
    console.log("src/components не найден. Статус Figma-связок пока нечего строить.");
    return;
  }

  const entries = await readdir(componentsDir, { withFileTypes: true });
  const componentNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"));

  const [publicIndex, componentsIndex] = await Promise.all([
    readIfExists(publicIndexPath),
    readIfExists(componentsIndexPath),
  ]);

  const rows = [];

  for (const componentName of componentNames) {
    const componentDir = path.join(componentsDir, componentName);
    const runtimePath = path.join(componentDir, `${componentName}.tsx`);
    const docsPath = path.join(componentDir, `${componentName}.docs.md`);
    const figmaPath = path.join(componentDir, `${componentName}.figma.js`);
    const storyPath = path.join(storiesDir, `${componentName}.stories.tsx`);

    const [hasRuntime, hasDocs, hasFigma, hasStory] = await Promise.all([
      pathExists(runtimePath),
      pathExists(docsPath),
      pathExists(figmaPath),
      pathExists(storyPath),
    ]);

    const publicExport =
      hasComponentExport(publicIndex, componentName) ||
      hasComponentExport(componentsIndex, componentName);
    const status = statusLabel(hasDocs, hasFigma);

    rows.push({
      component: componentName,
      publicExport,
      hasRuntime,
      hasStory,
      hasDocs,
      hasFigma,
      status,
      issues: issueLabel({ hasDocs, hasFigma, hasRuntime }),
    });
  }

  const markdown = createMarkdown(rows);

  if (process.argv.includes("--write")) {
    await writeFile(outputPath, markdown, "utf8");
    console.log(`Wrote ${path.relative(rootDir, outputPath)}`);
    return;
  }

  console.log(markdown);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
