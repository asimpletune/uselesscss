import 'mocha'
import { assert } from 'chai'
import { execSync } from 'child_process'
import fs from 'fs'

describe('cli', () => {
  before(function () {
    this.timeout(8000)
    execSync('npm run build')
  })
  it('Should print help statement', function () {
    let expected =
`usage:
  useless [options] <html> ([-] | [<css>])

options:
  -h --help  Show this message
  --version  Print version\n`
    let actual = String(execSync('./bin/useless --help'))
    assert.strictEqual(expected, actual)
  })
  it('Should print version statement', function () {
    let expected = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version + '\n'
    let actual = String(execSync('./bin/useless --version'))
    assert.strictEqual(expected, actual)
  })
})
