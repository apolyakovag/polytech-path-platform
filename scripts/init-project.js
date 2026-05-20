import { existsSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);

function getArg(name) {
  const prefix = `--${name}=`;
  const value = args.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : undefined;
}

function hasFlag(name) {
  return args.includes(`--${name}`);
}

function toPackageName(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function renameTemplate(source, target) {
  const sourcePath = path.join(rootDir, source);
  const targetPath = path.join(rootDir, target);

  if (!existsSync(sourcePath)) {
    return { source, target, status: "missing-source" };
  }

  if (existsSync(targetPath)) {
    return { source, target, status: "target-exists" };
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await rename(sourcePath, targetPath);
  return { source, target, status: "renamed" };
}

function run(command, commandArgs) {
  const executable = process.platform === "win32" ? `${command}.cmd` : command;
  const result = spawnSync(executable, commandArgs, {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${commandArgs.join(" ")} failed`);
  }
}

function checkPackageAccess(packageName) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npm, ["view", packageName, "version", "--silent"], {
    cwd: rootDir,
    encoding: "utf8",
  });

  const version = result.stdout?.trim();

  if (result.status === 0 && version) {
    console.log(`${packageName}: available from current npm registry (${version})`);
    return true;
  }

  console.log("");
  console.log(`Package check: ${packageName} is not available from current npm registry.`);
  console.log("Imports should still use:");
  console.log(`  import { Button } from "${packageName}";`);
  console.log("");
  console.log("Before installing, configure one of:");
  console.log("  - private npm registry / .npmrc access");
  console.log("  - local package link");
  console.log("  - file/git dependency for this package");
  console.log("");

  return false;
}

async function updatePackageName(projectName) {
  const packagePath = path.join(rootDir, "package.json");
  if (!existsSync(packagePath)) return;

  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
  packageJson.name = projectName;
  packageJson.private = true;
  packageJson.version = packageJson.version ?? "0.0.0";

  await writeFile(
    packagePath,
    `${JSON.stringify(packageJson, null, 2)}\n`,
    "utf8"
  );
}

async function ensureProjectDirs() {
  const dirs = [
    "src/assets/fonts",
    "src/layouts",
    "src/pages",
    "src/shared/layout-recipes",
    "docs/layout-recipes",
  ];

  await Promise.all(dirs.map((dir) => mkdir(path.join(rootDir, dir), {
    recursive: true,
  })));
}

async function main() {
  const projectName = toPackageName(
    getArg("name") || path.basename(rootDir) || "figma-implementation-project"
  );

  const renames = [
    ["package.template.json", "package.json"],
    ["vite.config.template.ts", "vite.config.ts"],
    ["tsconfig.template.json", "tsconfig.json"],
    ["tsconfig.build.template.json", "tsconfig.build.json"],
    ["eslint.config.template.js", "eslint.config.js"],
    [".editorconfig.template", ".editorconfig"],
    [".gitignore.template", ".gitignore"],
    ["src/main.template.tsx", "src/main.tsx"],
    ["src/App.template.tsx", "src/App.tsx"],
    ["src/styles/fonts.template.css", "src/styles/fonts.css"],
  ];

  console.log(`Initializing project: ${projectName}`);

  const results = [];
  for (const [source, target] of renames) {
    results.push(await renameTemplate(source, target));
  }

  await updatePackageName(projectName);
  await ensureProjectDirs();
  const hasDesignSystemPackage = checkPackageAccess("borrom-ds-test");

  for (const result of results) {
    console.log(`${result.status}: ${result.source} -> ${result.target}`);
  }

  if (hasFlag("install")) {
    if (!hasDesignSystemPackage) {
      console.log("npm install skipped: borrom-ds-test access is not configured.");
      process.exitCode = 1;
      return;
    }

    run("npm", ["install"]);
  }

  if (hasFlag("git")) {
    run("git", ["init"]);
    run("git", ["add", "."]);
    run("git", ["commit", "-m", "initial project template"]);
    run("git", ["branch", "-M", "main"]);
  }

  console.log("");
  console.log("Next steps:");
  if (!hasDesignSystemPackage) {
    console.log("  configure access to borrom-ds-test");
  }
  console.log("  npm install");
  console.log("  npm run server:start");
  console.log("  npm run server:stop");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
