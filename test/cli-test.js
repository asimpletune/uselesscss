import mocha from "mocha"
import { assert } from "chai"
import { execSync } from 'child_process'
import Useless from '../src/useless'
import fs from 'fs'

describe('cli', function() {
  it('Should print help statement', () => {
    let expected =
`usage:
  useless [options] <html> ([-] | [<css>])

options:
  -h --help  Show this message
  --version  Print version\n`
    let actual = String(execSync('./bin/useless --help'))
    assert.strictEqual(expected, actual)
  })
  it('Should print version statement', () => {
    let expected = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version + '\n'
    let actual = String(execSync('./bin/useless --version'))
    assert.strictEqual(expected, actual)
  })
});
