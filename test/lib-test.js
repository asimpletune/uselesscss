import mocha from "mocha"
import { assert } from "chai"
import Useless from '../src/useless'
import fs from 'fs';
import parse from '../src/parse';

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
