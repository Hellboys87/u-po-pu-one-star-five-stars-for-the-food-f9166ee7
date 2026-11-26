// One Star, Five Stars for the Food — make.fun bounty entry.
// Writes one single-sentence alien tourist review of Earth to
// $MAKEFUN_OUTPUT_DIR/entry.txt, falling back to /output/entry.txt.
// Node 22, stdlib only, no network, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "One star: your moon hangs there all night staring through my window like a nosy neighbour, but the dumplings were so good I stayed for breakfast anyway.";

const FALLBACK_DIR = "/output";

// Resolve the output directory, ignoring a missing, empty, or
// whitespace-only MAKEFUN_OUTPUT_DIR instead of crashing on it.
function resolveOutDir(): string {
  const raw = process.env.MAKEFUN_OUTPUT_DIR;
  if (raw === undefined) return FALLBACK_DIR;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return FALLBACK_DIR;
  return trimmed;
}

// Guard the competition gate before anything is written: one sentence,
// 1-200 characters, no leading or trailing whitespace (and therefore
// no trailing newline), ending in exactly one period.
function checkSentence(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`sentence must be 1-200 characters, got ${text.length}`);
  }
  if (text !== text.trim()) {
    throw new Error("sentence must not start or end with whitespace");
  }
  const periods = [...text].filter((ch) => ch === ".").length;
  if (periods !== 1 || !text.endsWith(".")) {
    throw new Error("sentence must be exactly one sentence ending in a period");
  }
}

checkSentence(SENTENCE);

const outDir = resolveOutDir();
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, SENTENCE, "utf8");
