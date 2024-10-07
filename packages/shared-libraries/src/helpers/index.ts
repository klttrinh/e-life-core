import fs from 'fs';
import readline from 'readline';

export * from './extend';
export * from './validator/one.of';
export * from './user-base-info/user.base.info';

export function filterKeys<T>(object: T, ...allowedKeys): Partial<T> {
  return Object.keys(object)
    .filter((key) => allowedKeys.includes(key))
    .reduce((cur, key) => {
      return Object.assign(cur, { [key]: object[key] });
    }, {});
}

export async function checkRequiredEnvs(path: string): Promise<string[]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const missingEnvs: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    if (line.trim() && !line.startsWith('#') && line.includes('=')) {
      const key = line.split('=')[0];
      const value = process.env[key];
      if (value === undefined) {
        missingEnvs.push(key);
      }
    }
  }
  rl.close();
  fileStream.close();
  return missingEnvs;
}
