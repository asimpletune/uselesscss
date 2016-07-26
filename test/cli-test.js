import 'mocha'
import { assert } from 'chai'
import { execSync } from 'child_process'
import fs from 'fs'
import temp from 'temporary'
import cheerio from 'cheerio'
import cssLib from 'css'

describe('cli', function () {
  before(function () {
    this.timeout(8000)
    execSync('npm run build')
  })
  describe('Help and version flags', function () {
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
  describe('Positional args', function () {
    let blankHtml
    before(function () {
      blankHtml = fs.readFileSync('./test/html/blank.html', 'utf8')
    })
    let $
    let tempHtmlFile
    let tempCssFile
    beforeEach(function () {
      $ = cheerio.load(blankHtml)
      tempHtmlFile = new temp.File()
      tempCssFile = new temp.File()
    })
    afterEach(function () {
      tempHtmlFile.unlink()
      tempCssFile.unlink()
    })
    it('Should return nothing if no <css> is provided', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path}`))
      assert.strictEqual('', actual)
    })
    it('Should read <css> from STDIN, negative case', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let ast = cssLib.parse('a {color: "red";}')
      let css = cssLib.stringify(ast)
      tempCssFile.writeFileSync(css)
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path} - <${tempCssFile.path}`))
      assert.strictEqual('', actual)
    })
    it('Should read <css> from STDIN, positive case', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let ast = cssLib.parse('p {color: "red";}')
      let css = cssLib.stringify(ast)
      tempCssFile.writeFileSync(css)
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path} - <${tempCssFile.path}`))
      assert.strictEqual(css, actual)
    })
    it('Should read <css> from STDIN, negative case', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let ast = cssLib.parse('a {color: "red";}')
      let css = cssLib.stringify(ast)
      tempCssFile.writeFileSync(css)
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path} - <${tempCssFile.path}`))
      assert.strictEqual('', actual)
    })
    it('Should accept <html> and <css> as local files, positive case', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let ast = cssLib.parse('p {color: "red";}')
      let css = cssLib.stringify(ast)
      tempCssFile.writeFileSync(css)
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path} ${tempCssFile.path}`))
      assert.strictEqual(css, actual)
    })
    it('Should accept <html> and <css> as local files, negative case', function () {
      $('body').append('<p>Hello, world!</p>')
      tempHtmlFile.writeFileSync($.html())
      let ast = cssLib.parse('a {color: "red";}')
      let css = cssLib.stringify(ast)
      tempCssFile.writeFileSync(css)
      let actual = String(execSync(`./bin/useless ${tempHtmlFile.path} ${tempCssFile.path}`))
      assert.strictEqual('', actual)
    })
  })
})
