#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "packages");

function padDay(n) {
  return String(n).padStart(2, "0");
}

function findLastDayNumber() {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  const dayNumbers = entries
    .filter((d) => d.isDirectory() && /^day\d{2}$/.test(d.name))
    .map((d) => Number(d.name.slice(3)))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);

  if (dayNumbers.length === 0) {
    console.error("❌ No dayXX folders found under src/ (e.g. src/day01).");
    process.exit(1);
  }

  const last = dayNumbers[dayNumbers.length - 1];

  if (last >= 25) {
    console.error("❌ Already at day25; Advent of Code only has 25 days.");
    process.exit(1);
  }

  return last;
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
    // symlinks etc. not handled; adapt if you use them
  }
}

function updatePackageJson(dayDir, dayNumber) {
  const pkgPath = path.join(dayDir, "package.json");

  if (!fs.existsSync(pkgPath)) {
    console.warn(`⚠️  No package.json found in ${dayDir}, skipping package name update.`);
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const dayStr = padDay(dayNumber);

  // Force the convention @aoc/dayXX
  pkg.name = `@aoc/day${dayStr}`;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`📦 Set package name to ${pkg.name}`);
}

function clearInputs(dayDir) {
  const inputs = ["input.txt", "input.example.txt"];

  for (const file of inputs) {
    const filePath = path.join(dayDir, file);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
      console.log(`🧹 Cleared ${path.relative(rootDir, filePath)}`);
    } else {
      // If you prefer to always create them:
      fs.writeFileSync(filePath, "");
      console.log(`📄 Created empty ${path.relative(rootDir, filePath)}`);
    }
  }
}

function updateTsconfigBuild(newDayDirName) {
  const tsconfigPath = path.join(rootDir, "tsconfig.build.json");

  if (!fs.existsSync(tsconfigPath)) {
    console.warn("⚠️ tsconfig.build.json not found; skipping tsconfig update.");
    return;
  }

  const raw = fs.readFileSync(tsconfigPath, "utf8");

  let tsconfig;
  try {
    tsconfig = JSON.parse(raw);
  } catch (e) {
    console.error(
      "❌ Could not parse tsconfig.build.json as JSON. " +
        "If you are using comments, you’ll need to strip them or adjust this script."
    );
    process.exit(1);
  }

  const relPath = `packages/${newDayDirName}`;
  tsconfig.references = tsconfig.references || [];

  const alreadyThere = tsconfig.references.some((ref) => ref.path === relPath);
  if (!alreadyThere) {
    tsconfig.references.push({ path: relPath });
    console.log(`🧱 Added TypeScript reference: ${relPath}`);
  } else {
    console.log(`ℹ️ TypeScript reference ${relPath} already present, not adding again.`);
  }

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + "\n");
}

function main() {
  const last = findLastDayNumber();
  const next = last + 1;

  const lastName = `day${padDay(last)}`;
  const nextName = `day${padDay(next)}`;

  const lastDir = path.join(srcDir, lastName);
  const nextDir = path.join(srcDir, nextName);

  if (!fs.existsSync(lastDir)) {
    console.error(`❌ Expected to find ${lastDir} but it does not exist.`);
    process.exit(1);
  }

  if (fs.existsSync(nextDir)) {
    console.error(`❌ Target directory ${nextDir} already exists.`);
    process.exit(1);
  }

  console.log(`📂 Creating ${nextName} from ${lastName}...`);
  copyDirRecursive(lastDir, nextDir);

  updatePackageJson(nextDir, next);
  clearInputs(nextDir);
  updateTsconfigBuild(nextName);

  console.log("✅ Done.");
}

main();
