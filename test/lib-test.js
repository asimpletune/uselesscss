import mocha from "mocha"
import { assert } from "chai"
import Useless from '../src/useless'
import fs from 'fs';

describe('lib', () => {
  it('Should return an empty string if no css is provided', () => {
    var htmlString = fs.readFileSync('./test/no-elements.html').toString()
    var output = Useless(htmlString);
    assert.strictEqual(output, '')
  })
  it('Should return an empty string if no css is used', () => {
    var htmlString = fs.readFileSync('./test/no-elements.html').toString()
    var cssString = fs.readFileSync('./test/simple.css').toString()
    var output = Useless(htmlString, cssString);
    assert.strictEqual(output, '')
  })
});
