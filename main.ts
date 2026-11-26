// One Star, Five Stars for the Food — make.fun bounty entry.
// Writes a single-sentence alien tourist review of Earth to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falls back to /output/entry.txt).
// Node 22, stdlib only, no network, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "One star: your moon hangs there all night staring through my window like a nosy neighbour, but the dumplings were so good I stayed for breakfast anyway.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, SENTENCE, "utf8");
