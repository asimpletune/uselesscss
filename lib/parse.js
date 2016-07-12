'use strict';Object.defineProperty(exports,"__esModule",{value:true}); /**
 * Whitespace
 */var SPACE=' ',TAB='\t',LINE_FEED='\n',CARRIAGE_RETURN='\r',FORM_FEED='\f';var WHITESPACE=[SPACE,TAB,LINE_FEED,CARRIAGE_RETURN,FORM_FEED];var CSS_COMBINATOR_WHITESPACE='\\' + SPACE + '\\' + TAB + '\\' + LINE_FEED + '\\' + CARRIAGE_RETURN + '\\' + FORM_FEED; /**
 * Other combinator separators
 */var GREATER_THAN='>';var PLUS='+';var TILDE='~';var COMBINATORS=[TILDE,PLUS,GREATER_THAN].concat(WHITESPACE);var CSS_COMBINATOR_NONWHITESPACE='\\' + GREATER_THAN + '\\' + TILDE + '\\' + PLUS;var SELECTOR_REGEX=(function(){return new RegExp('([^' + CSS_COMBINATOR_WHITESPACE + CSS_COMBINATOR_NONWHITESPACE + '])+','g');})();console.log(SELECTOR_REGEX); /**
 * Takes a selector, returns an array of one or more sequences of simple selectors, delimited by combinators
 */exports.default = {sequence:function sequence(selector){return selector.match(SELECTOR_REGEX);}};
//# sourceMappingURL=parse.js.map