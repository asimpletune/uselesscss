import mocha from "mocha"
import { assert } from "chai"
import { execSync } from 'child_process'
import Useless from '../src/useless'
import fs from 'fs';

describe('cli', function() {
  it('Should print help statement', () => {
    let expected =
`usage:
  useless <html>

options:
  -h --help   Show this message
  --version   Print version
\n`
    let actual = String(execSync('./bin/useless.js --help'))
    assert.strictEqual(expected, actual)
  })
});

describe('lib', function() {
  it('Should receive a string of HTML and return a string of CSS', () => {
    var htmlString = fs.readFileSync('./example/small/index.html').toString()
    var cssStringArr = Useless(htmlString);
    console.log("read html and converted css", cssStringArr.length);
    cssStringArr.forEach((el) => {
      console.log(el);
    })
  })
});
