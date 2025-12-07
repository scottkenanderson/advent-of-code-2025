import readFile from './readFile';

describe('readFile.ts', () => {
  test('readFile splits file contents', () => {
    const fs = require('fs');
    const filename = 'testfile.txt';
    fs.writeFileSync(filename, 'a\nb\nc');
    expect(readFile(filename)).toEqual(['a', 'b', 'c']);
    fs.unlinkSync(filename);
  });
});
