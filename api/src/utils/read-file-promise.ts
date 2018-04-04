import * as fs from 'fs';

export function readFileProm<T>(path: string): Promise<T> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err: any | null, data: string) {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data) as T);
    });
  });
}
