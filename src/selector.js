/**
 * Whitespace
 */
const SPACE = '\u0020',
  TAB = '\u0009',
  LINE_FEED = '\u000A',
  CARRIAGE_RETURN = '\u000D',
  FORM_FEED = '\u000C'

const WHITESPACE = [SPACE, TAB, LINE_FEED, CARRIAGE_RETURN, FORM_FEED]
const CSS_COMBINATOR_WHITESPACE = `\\${SPACE}\\${TAB}\\${LINE_FEED}\\${CARRIAGE_RETURN}\\${FORM_FEED}`;

/**
 * Other combinator separators
 */
const GREATER_THAN = '\u003E'
const PLUS = '\u002B'
const TILDE = '\u007E'

const COMBINATORS = [TILDE, PLUS, GREATER_THAN].concat(WHITESPACE)
const CSS_COMBINATOR_NONWHITESPACE = `\\${GREATER_THAN}\\${TILDE}\\${PLUS}`;

const SELECTOR_REGEX = (() => {
  return new RegExp(`([^${CSS_COMBINATOR_WHITESPACE}${CSS_COMBINATOR_NONWHITESPACE}])+`, 'g')
})()

/**
 * Takes a selector, returns an array of one or more sequences of simple selectors, delimited by combinators
 */
export default function Selector(selector) {
  return {
    "pseudo": pseudo(selector)
  }
}

const PSEUDO_CLASSES = new Set([ ':active',
  ':checked',
  ':disabled',
  ':empty',
  ':enabled',
  ':first-child',
  ':first-of-type',
  ':focus',
  ':hover',
  ':lang(fr)',
  ':last-child',
  ':last-of-type',
  ':link',
  ':not(div)',
  ':nth-child(an+b)',
  ':nth-last-child(an+b)',
  ':nth-last-of-type(an+b)',
  ':nth-of-type(an+b)',
  ':only-child',
  ':only-of-type',
  ':root',
  ':target',
  ':visited' ])
const DYNAMIC_PSEUDO_CLASSES = new Set([':link',
  ':visited',
  ':hover',
  ':active',
  ':focus'])
const UI_ELEMENT_PSEUDO_CLASSES = new Set([':enabled',
  ':disabled',
  ':checked',
  ':indeterminate'])
const STRUCTURAL_PSEUDO_CLASSES_REGEX = /(:root|:nth-child\(.*\)|:nth-last-child\(.*\)|nth-of-type\(.*\)|:nth-last-of-type\(.*\)|:first-child|:last-child|:first-of-type|:last-of-type|:only-child|:only-of-type|:empty)/

const PSEUDO_ELEMENTS = new Set([ '::first-line',
  ':first-line',
  '::first-letter',
  ':first-letter',
  '::blank',
  ':blank',
  '::before',
  ':before',
  '::after',
  ':after'])

/**
Returns either a pseudo-class object:
{
  type: (dynamic|target|language|ui element|structural|blank|negation|non-standard)
  val: one of the PSEUDO_CLASSES or a non-standard value
}
Or a pseudo-element object:
{
  type: (element|non-standard)
  val: one of the PSEUDO_ELEMENTS or a non-standard value
}
 */
function pseudo(selector) {
  let pseudoToken = selector.match(/(::|:)(?!.*:).*/g) || []
  if (pseudoToken.length > 1) console.error("REGEX to tokenize pseudo had multiple mathes!", pseudoToken);
  let result = {"val" : pseudoToken[0]}
  if (!result.val) {
    return undefined;
  } else if (DYNAMIC_PSEUDO_CLASSES.has(result.val)) {
    result.type = 'dynamic'
  } else if (result.val ===':target') {
    result.type = 'target'
  } else if (/:lang\(.+\)/g.test(result.val)) {
    result.type = 'language'
  } else if (UI_ELEMENT_PSEUDO_CLASSES.has(result.val)) {
    result.type = 'ui element'
  } else if (STRUCTURAL_PSEUDO_CLASSES_REGEX.test(result.val)) {
    result.type = 'structural'
  } else if (/:contains\(.*\)/.test(result.val)) {
    result.type = 'blank'
  } else if (/:not\(.*\)/.test(result.val)) {
    result.type = 'negation'
  } else if(PSEUDO_ELEMENTS.has(result.val)) {
    result.type = 'element'
  } else {
    result.type = 'non-standard'
  }
  return result
}
