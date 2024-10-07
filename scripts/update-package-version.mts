import { cwd } from 'node:process';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { EOL } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';

const execAsync = promisify(exec);

const ENCODING = 'utf-8' as const;
const PACKAGE_JSON = 'package.json' as const;

const CWD = cwd();

const PATH = `${CWD}/${PACKAGE_JSON}`;

let pkgContent = await readFile(PATH, ENCODING);

const pkg = JSON.parse(pkgContent);

console.info(`Updating "${pkg.name}" version from "${pkg.version}"!`);

const now = new Date();

pkg.version = `${now.getUTCFullYear()}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-auto.${now.getTime()}`;

pkgContent = JSON.stringify(pkg, undefined, 2);

pkgContent += EOL;

await writeFile(PATH, pkgContent, ENCODING);

await execAsync(`git add ${PATH}`)

console.info(`Updated "${pkg.name}" version to "${pkg.version}"!`);
