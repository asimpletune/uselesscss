import mocha from "mocha"
import { assert } from "chai"
import Useless from '../src/useless'
import fs from 'fs';
import cheerio from 'cheerio'
import cssLib from 'css'

describe('lib', () => {
  let blankHtmlTemplate = ''
  before(() => {
    blankHtmlTemplate = fs.readFileSync('./test/html/blank.html', 'utf8')
  });
  /**
   * Test cases follow pattern specified in https://www.w3.org/TR/css3-selectors/#selectors
   */
  describe('Empty cases', () => {
    it(`Should return an empty string if no CSS is provided`, () => {
      var html = blankHtmlTemplate
      var output = Useless(html);
      assert.strictEqual(output, '')
    })
    it(`Should return an empty string if no CSS is used`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<p class="bold">Hello, world!</p>')
      let ast = cssLib.parse('a {color: red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
  })
  describe('Universal selector', () => {
    it(`Should always include universal selector`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      let ast = cssLib.parse('*{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
  })
  describe('Type selector', () => {
    it(`Should include type selectors from CSS, if they're present in HTML`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`Should exclude type selectors from CSS, if they're not present in HTML`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('p{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
  });
  describe('Attribute selector', () => {
    it(`E[foo] postive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[bar]: negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[bar]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[foo="bar"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="bar" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo="bar"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[foo="bar"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="baz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo="bar"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[foo~="bar"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="foo bar baz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo~="bar"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[foo~="bar"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="foo bar baz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo~="buzz"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[foo^="bar"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo^="bar"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[foo^="bar"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo^="arbaz"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[foo$="bar"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo$="arbaz"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[foo$="bar"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo$="arba"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[foo*="bar"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo*="arba"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[foo*="bar"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a foo="barbaz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo*="buzz"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E[lang|="en"] positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a lang="zh-Hant" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[lang|="zh"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E[lang|="en"] negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<a lang="zh-Hant" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[lang|="hant"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
  })
  describe('Structural pseudo-classes', () => {
    it(`:root should always apply`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      let ast = cssLib.parse(':root{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:nth-child(an+b) positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-child(2n+1){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:nth-child(an+b) negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-child(7){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E:nth-last-child(an+b) positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-last-child(2n+1){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:nth-last-child(an+b) negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-last-child(7){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E:nth-of-type(an+b) positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-of-type(2n+1){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:nth-of-type(an+b) negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-of-type(7){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E:nth-last-of-type(an+b) positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-last-of-type(2n+1){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:nth-last-of-type(an+b) negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>')
      let ast = cssLib.parse('div:nth-last-of-type(7){color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
    it(`E:first-child positive case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div><span>1</span><span>2</span></div>')
      let ast = cssLib.parse('span:first-child{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, css)
    })
    it(`E:first-child negative case`, () => {
      let $ = cheerio.load(blankHtmlTemplate)
      $('body').append('<div><span>1</span><span>2</span></div>')
      let ast = cssLib.parse('p:first-child{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
  })
});
