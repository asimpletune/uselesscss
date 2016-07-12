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

console.log(SELECTOR_REGEX);

/**
 * Takes a selector, returns an array of one or more sequences of simple selectors, delimited by combinators
 */
export default {
  sequence: function(selector) {
    return selector.match(SELECTOR_REGEX)
  }
}
