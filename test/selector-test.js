import mocha from "mocha"
import { assert } from "chai"
import selector from '../src/selector';
import cssLib from 'css'
import fs from 'fs'


describe('selector parsing', () => {
  describe('pseudo', () => {
    let pseudoClassStylesheet = '', pseudoElementStylesheet = ''
    before(() => {
      pseudoClassStylesheet = fs.readFileSync('./test/css/pseudo-classes.css', 'utf8')
      pseudoElementStylesheet = fs.readFileSync('./test/css/pseudo-elements.css', 'utf8')
    })
    describe('pseudo-classes', () => {
      it('Should return a parse object when supplied with a pseudo-class selector', () => {
        let ast = cssLib.parse(pseudoClassStylesheet)
        let actual = ast.stylesheet.rules[0].selectors.reduce((prev, curr) => {
          return prev && !!selector(curr).pseudo
        }, true)
        assert.strictEqual(true, actual)
      })
      it('Should return the right type when supplied with a pseudo-class selector', () => {
        let ast = cssLib.parse(pseudoClassStylesheet)
        let expected = [ 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'structural', 'dynamic', 'dynamic', 'dynamic', 'dynamic', 'dynamic', 'target', 'language', 'ui element', 'ui element', 'ui element', 'negation' ]
        assert.strictEqual(expected.length, ast.stylesheet.rules[0].selectors.length)
        ast.stylesheet.rules[0].selectors.forEach((el, index) => {
          assert.strictEqual(expected[index], selector(el).pseudo.type)
        })
      })
      it('Should return the right value when supplied with a pseudo-class selector', () => {
        let ast = cssLib.parse(pseudoClassStylesheet)
        let expected = [ ':root', ':nth-child(n)', ':nth-last-child(n)', ':nth-of-type(n)', ':nth-last-of-type(n)', ':first-child', ':last-child', ':first-of-type', ':last-of-type', ':only-child', ':only-of-type', ':empty', ':link', ':visited', ':active', ':hover', ':focus', ':target', ':lang(fr)', ':enabled', ':disabled', ':checked',':not(div)' ]
        assert.strictEqual(expected.length, ast.stylesheet.rules[0].selectors.length)
        ast.stylesheet.rules[0].selectors.forEach((el, index) => {
          assert.strictEqual(expected[index], selector(el).pseudo.val)
        })
      })
      it('Should correctly parse non-standard pseudo-classes as a type', () => {
        let ast = cssLib.parse(pseudoClassStylesheet)
        let expected = 'non-standard'
        assert.strictEqual(expected, selector(ast.stylesheet.rules[1].selectors[0]).pseudo.type)
      })
      it('Should correctly parse non-standard pseudo-class values', () => {
        let ast = cssLib.parse(pseudoClassStylesheet)
        let expected = ':-ms-input-placeholder'
        assert.strictEqual(expected, selector(ast.stylesheet.rules[1].selectors[0]).pseudo.val)
      })
    })
    describe('pseudo-elements', () => {
      it('Should return a parse object when supplied with a pseudo-element selector', () => {
        let ast = cssLib.parse(pseudoElementStylesheet)
        let actual = ast.stylesheet.rules[0].selectors.reduce((prev, curr) => {
          return prev && !!selector(curr).pseudo
        }, true)
        assert.strictEqual(true, actual)
      })
      it('Should return the right type when supplied with a pseudo-element selector', () => {
        let ast = cssLib.parse(pseudoElementStylesheet)
        let expected = ['element','element','element','element','element','element','element','element','element','element']
        assert.strictEqual(expected.length, ast.stylesheet.rules[0].selectors.length)
        ast.stylesheet.rules[0].selectors.forEach((el, index) => {
          assert.strictEqual(expected[index], selector(el).pseudo.type)
        })
      })
      it('Should return the right value when supplied with a pseudo-element selector', () => {
        let ast = cssLib.parse(pseudoElementStylesheet)
        let expected = ['::first-line',':first-line','::first-letter',':first-letter','::blank',':blank','::before',':before','::after',':after']
        assert.strictEqual(expected.length, ast.stylesheet.rules[0].selectors.length)
        ast.stylesheet.rules[0].selectors.forEach((el, index) => {
          assert.strictEqual(expected[index], selector(el).pseudo.val)
        })
      })
      it('Should correctly parse non-standard pseudo-elements as a type', () => {
        let ast = cssLib.parse(pseudoElementStylesheet)
        let expected = 'non-standard'
        assert.strictEqual(expected, selector(ast.stylesheet.rules[1].selectors[0]).pseudo.type)
      })
      it('Should correctly parse non-standard pseudo-element values', () => {
        let ast = cssLib.parse(pseudoElementStylesheet)
        let expected = '::-moz-placeholder'
        assert.strictEqual(expected, selector(ast.stylesheet.rules[1].selectors[0]).pseudo.val)
      })
    })
  })
})

// describe('selector grammar', () => {
//   describe('selector -> (sequences of simple selectors)*', () => {
//     describe('combinators', () => {
//       it('Should delimit the descendent combinator on spaces, tabs, line feeds, carriage returns, and form feeds', () => {
//         let s = '\u0020', t = '\u0009', lf = '\u000A', cr = '\u000D', ff = '\u000C'
//         let descendentSelector = `${s}#myId${lf}div#anotherId${t}p.myClass1.andMyClass2${s}div.aClass${t}${s}div${lf}${lf}p${cr}${ff}a${s}`;
//         let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
//         let actual = parse.sequence(descendentSelector)
//         assert.deepEqual(expected, actual)
//       })
//       it('Should delimit the child combinator on >', () => {
//         let gt = '\u003E'
//         let childSelector = `#myId${gt}div#anotherId ${gt}p.myClass1.andMyClass2${gt} div.aClass ${gt} ${gt}div ${gt}${gt} p${gt} ${gt}a${gt} `;
//         let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
//         let actual = parse.sequence(childSelector)
//         assert.deepEqual(expected, actual)
//       })
//       it('Should delimit the sibling combinator on +', () => {
//         let p = '\u002B'
//         let siblingSelector = `#myId${p}div#anotherId ${p}p.myClass1.andMyClass2${p} div.aClass ${p} ${p}div ${p}${p} p${p} ${p}a${p} `;
//         let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
//         let actual = parse.sequence(siblingSelector)
//         assert.deepEqual(expected, actual)
//       })
//       it('Should delimit the general sibling combinator on ~', () => {
//         let t = '\u007E'
//         let generalSiblingSelector = `#myId${t}div#anotherId ${t}p.myClass1.andMyClass2${t} div.aClass ${t} ${t}div ${t}${t} p${t} ${t}a${t} `;
//         let expected = ['#myId', 'div#anotherId', 'p.myClass1.andMyClass2', 'div.aClass', 'div', 'p', 'a']
//         let actual = parse.sequence(generalSiblingSelector)
//         assert.deepEqual(expected, actual)
//       })
//     })
//   })
// })
