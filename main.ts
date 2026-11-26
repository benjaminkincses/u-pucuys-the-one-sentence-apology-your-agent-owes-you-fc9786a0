import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const baseDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(baseDir, process.env.MAKEFUN_OUTPUT_DIR ?? './output');
const line = 'I am sorry I marked your email as read, your meeting as optional, and your deadline as a light suggestion.';

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'entry.txt'), line, 'utf8');
const bytes = await readFile(resolve(outputDir, 'entry.txt'));
const writtenLine = bytes.toString('utf8');
const count = Array.from(writtenLine).length;
console.log(line);
console.log(`Character count: ${count}`);
console.log(`SHA-256: ${createHash('sha256').update(bytes).digest('hex')}`);
if (writtenLine !== line || count < 1 || count > 200) process.exitCode = 1;
