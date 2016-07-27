import 'console.table'
import 'mocha'
import { assert } from 'chai'
import fs from 'fs'
import cssLib from 'css'
import { execSync } from 'child_process'
import temp from 'temporary'
import util from 'util'

describe('Comparison of uselesscss to similar tools', function () {
  let bootswatchPath
  let bootstrapPath
  before(function () {
    bootswatchPath = './test/html/bootswatch.html'
    bootstrapPath = './test/css/bootstrap.css'
  })
  describe('Uselesscss vs Uncss', function () {
    let tempUselessCss
    let tempUnCss
    beforeEach(function () {
      tempUselessCss = new temp.File()
      tempUnCss = new temp.File()
    })
    it('CLI should produce equivalent output to uncss', function () {
      this.timeout(20000)
      let uselessStart = process.hrtime()
      let uselessBootstrap = String(execSync(`./bin/uselesscss ${bootswatchPath} ${bootstrapPath}`))
      let uselessElapsed = process.hrtime(uselessStart)
      let uncssStart = process.hrtime()
      let uncssBootstrap = String(execSync(`uncss ${bootswatchPath}`))
      let uncssElapsed = process.hrtime(uncssStart)
      tempUselessCss.writeFileSync(uselessBootstrap)
      tempUnCss.writeFileSync(uncssBootstrap)
      let result = compare({
        'path': tempUselessCss.path,
        'name': 'useless',
        'elapsed': util.format('%ds %dms', uselessElapsed[0], uselessElapsed[1] / 1000000)
      }, {
        'path': tempUnCss.path,
        'name': 'uncss',
        'elapsed': util.format('%ds %dms', uncssElapsed[0], uncssElapsed[1] / 1000000)
      })
      assert.strictEqual(result.other['rules'], result.uselesscss['rules'])
      assert.isAtLeast(result.other['comments'], result.uselesscss['comments'])
      assert.strictEqual(result.other['media rules'], result.uselesscss['media rules'])
      assert.strictEqual(result.other['keyframes'], result.uselesscss['keyframes'])
      assert.strictEqual(result.other['font-face rules'], result.uselesscss['font-face rules'])
    })
    afterEach(function () {
      tempUselessCss.unlink()
      tempUnCss.unlink()
    })
  })
})

function compare (useless, other) {
  let uselessCss = fs.readFileSync(useless.path, 'utf8')
  let otherCss = fs.readFileSync(other.path, 'utf8')
  let uselessAst = cssLib.parse(uselessCss)
  let otherAst = cssLib.parse(otherCss)

  let uselessRules = uselessAst.stylesheet.rules
  let otherRules = otherAst.stylesheet.rules
  let uselessStats = {
    'program': useless.name,
    'elapsed': useless.elapsed,
    'rules': 0,
    'comments': 0,
    'media rules': 0,
    'keyframes': 0,
    'font-face rules': 0
  }
  let otherStats = {
    'program': other.name,
    'elapsed': other.elapsed,
    'rules': 0,
    'comments': 0,
    'media rules': 0,
    'keyframes': 0,
    'font-face rules': 0
  }

  function countStats (cssRules, stats) {
    cssRules.forEach((rule) => {
      switch (rule.type) {
        case 'rule':
          stats['rules']++
          break
        case 'comment':
          stats['comments']++
          break
        case 'media':
          stats['media rules']++
          break
        case 'keyframes':
          stats['keyframes']++
          break
        case 'font-face':
          stats['font-face rules']++
          break
        default:
          console.log('Add a case for this!', rule.type)
      }
    })
  }

  countStats(uselessRules, uselessStats)
  countStats(otherRules, otherStats)

  console.table(`Results: (${useless.name} vs ${other.name})`, [uselessStats, otherStats])
  return {'uselesscss': uselessStats, 'other': otherStats}
}
