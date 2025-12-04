import fs from 'fs';

export default function readFile(filename: string): Array<string> {
  return fs.readFileSync(filename).toString()
    .split('\n');
}
