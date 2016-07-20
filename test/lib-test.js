import mocha from "mocha"
import { assert } from "chai"
import Useless from '../src/useless'
import fs from 'fs';
import parse from '../src/parse';
import cheerio from 'cheerio'
import cssLib from 'css'

describe('lib', () => {
  let blankHtmlTemplate = ''
  before(() => {
    blankHtmlTemplate = fs.readFileSync('./test/blank.html', 'utf8')
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
      $('body').append('<a foo="bar baz" href="http://github.com/asimpletune/uselesscss">useless</a>')
      let ast = cssLib.parse('a[foo^="arbaz"]{color:red;}')
      let html = $.root().html(), css = cssLib.stringify(ast)
      let output = Useless(html, css);
      assert.strictEqual(output, '')
    })
  })
  describe('selectors', () => {
    describe('selector grammar', () => {
      describe('selector -> (sequences of simple selectors)*', () => {
        describe('combinators', () => {
          it('Should delimit the descendent combinator on spaces, tabs, line feeds, carriage returns, and form feeds', () => {
            let s = '\u0020', t = '\u0009', lf = '\u000A', cr = '\u000D', ff = '\u000C'
            let descendentSelector = `${s}#myId${lf}div#anotherId${t}p.myClass1.andMyClass2${s}div.aClass${t}${s}div${lf}${lf}p${cr}${ff}a${s}`;
            let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
            let actual = parse.sequence(descendentSelector)
            assert.deepEqual(expected, actual)
          })
          it('Should delimit the child combinator on >', () => {
            let gt = '\u003E'
            let childSelector = `#myId${gt}div#anotherId ${gt}p.myClass1.andMyClass2${gt} div.aClass ${gt} ${gt}div ${gt}${gt} p${gt} ${gt}a${gt} `;
            let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
            let actual = parse.sequence(childSelector)
            assert.deepEqual(expected, actual)
          })
          it('Should delimit the sibling combinator on +', () => {
            let p = '\u002B'
            let siblingSelector = `#myId${p}div#anotherId ${p}p.myClass1.andMyClass2${p} div.aClass ${p} ${p}div ${p}${p} p${p} ${p}a${p} `;
            let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
            let actual = parse.sequence(siblingSelector)
            assert.deepEqual(expected, actual)
          })
          it('Should delimit the general sibling combinator on ~', () => {
            let t = '\u007E'
            let generalSiblingSelector = `#myId${t}div#anotherId ${t}p.myClass1.andMyClass2${t} div.aClass ${t} ${t}div ${t}${t} p${t} ${t}a${t} `;
            let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
            let actual = parse.sequence(generalSiblingSelector)
            assert.deepEqual(expected, actual)
          })
        })
      })
    })
  })
});
