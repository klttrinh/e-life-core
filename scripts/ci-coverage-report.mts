/* eslint-disable no-await-in-loop,no-restricted-syntax,import/no-extraneous-dependencies */
import { mergeFiles as mergeJUnitFiles } from 'junit-report-merger';
import { execSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import { cwd } from 'node:process';

const ENCODING = 'utf-8' as const;
const JUNIT_FILE = 'junit.xml' as const;

const CWD = cwd();

const [apps, packages] = await Promise.all([readdir(resolve(CWD, 'apps')), readdir(resolve(CWD, 'packages'))]);

let projects = [
  ...apps.map((name) => resolve(CWD, 'apps', name)),
  ...packages.map((name) => resolve(CWD, 'packages', name)),
];

projects = projects
  .filter((project) => statSync(project).isDirectory())
  .filter((project) => existsSync(resolve(project, JUNIT_FILE)));

/* ------------------------- Combining the junit files ------------------------- */

const JUNIT_FILES: string[] = [];

for (const project of projects) {
  const PATH = resolve(project, JUNIT_FILE);

  let junit = await readFile(PATH, ENCODING);

  const RELATIVE_PATH = relative(CWD, project);

  junit = junit.replaceAll(/file="(.+)"/g, `file="${RELATIVE_PATH}/$1"`);

  await writeFile(PATH, junit, ENCODING);

  JUNIT_FILES.push(PATH);
}

await mergeJUnitFiles(resolve(CWD, JUNIT_FILE), JUNIT_FILES);

/* ------------------------- Combining the cobertura files ------------------------- */

const inputs = projects.map(
  (project) => `${basename(project)}=${relative(CWD, resolve(project, 'coverage', 'cobertura-coverage.xml'))}`,
);

await mkdir(resolve(CWD, 'coverage'), { recursive: true });

execSync(`pnpm cobertura-merge -o coverage/cobertura-coverage.xml ${inputs.join(' ')}`);

/* ------------------------- Reporting coverage ------------------------- */

const results: number[] = [];

for (const project of projects) {
  const PATH = resolve(project, 'coverage', 'lcov-report', 'index.html');

  const html = await readFile(PATH, ENCODING);

  const lines = html.split('\n');

  const nextLine = lines.findIndex((line) => /Statements/.test(line));

  results.push(+lines[nextLine - 1].replace(/^.*> *(.+)% *<\/.*$/, '$1'));
}

const median = results.reduce((sum, current) => sum + current, 0) / projects.length;

// eslint-disable-next-line no-console
console.log(`All files | ${(median / 100).toLocaleString('en-US', { style: 'percent', maximumFractionDigits: 2 })}`);
