import fs from 'fs';

export default function readFile(filename: string, delimiter: string = '\n'): Array<string> {
  return fs.readFileSync(filename).toString()
    .split(delimiter);
}
