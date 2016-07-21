'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.default = Selector; /**
 * Whitespace
 */var SPACE=' ',TAB='\t',LINE_FEED='\n',CARRIAGE_RETURN='\r',FORM_FEED='\f';var WHITESPACE=[SPACE,TAB,LINE_FEED,CARRIAGE_RETURN,FORM_FEED];var CSS_COMBINATOR_WHITESPACE='\\' + SPACE + '\\' + TAB + '\\' + LINE_FEED + '\\' + CARRIAGE_RETURN + '\\' + FORM_FEED; /**
 * Other combinator separators
 */var GREATER_THAN='>';var PLUS='+';var TILDE='~';var COMBINATORS=[TILDE,PLUS,GREATER_THAN].concat(WHITESPACE);var CSS_COMBINATOR_NONWHITESPACE='\\' + GREATER_THAN + '\\' + TILDE + '\\' + PLUS;var SELECTOR_REGEX=(function(){return new RegExp('([^' + CSS_COMBINATOR_WHITESPACE + CSS_COMBINATOR_NONWHITESPACE + '])+','g');})(); /**
 * Takes a selector, returns an array of one or more sequences of simple selectors, delimited by combinators
 */function Selector(selector){return {"pseudo":pseudo(selector)};}var PSEUDO_CLASSES=new Set([':active',':checked',':disabled',':empty',':enabled',':first-child',':first-of-type',':focus',':hover',':lang(fr)',':last-child',':last-of-type',':link',':not(div)',':nth-child(an+b)',':nth-last-child(an+b)',':nth-last-of-type(an+b)',':nth-of-type(an+b)',':only-child',':only-of-type',':root',':target',':visited']);var DYNAMIC_PSEUDO_CLASSES=new Set([':link',':visited',':hover',':active',':focus']);var UI_ELEMENT_PSEUDO_CLASSES=new Set([':enabled',':disabled',':checked',':indeterminate']);var STRUCTURAL_PSEUDO_CLASSES_REGEX=/(:root|:nth-child\(.*\)|:nth-last-child\(.*\)|nth-of-type\(.*\)|:nth-last-of-type\(.*\)|:first-child|:last-child|:first-of-type|:last-of-type|:only-child|:only-of-type|:empty)/;var PSEUDO_ELEMENTS=new Set(['::first-line',':first-line','::first-letter',':first-letter','::blank',':blank','::before',':before','::after',':after']); /**
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
 */function pseudo(selector){var pseudoToken=selector.match(/(::|:)(?!.*:).*/g) || [];if(pseudoToken.length > 1)console.error("REGEX to tokenize pseudo had multiple mathes!",pseudoToken);var result={"val":pseudoToken[0]};if(!result.val){return undefined;}else if(DYNAMIC_PSEUDO_CLASSES.has(result.val)){result.type = 'dynamic';}else if(result.val === ':target'){result.type = 'target';}else if(/:lang\(.+\)/g.test(result.val)){result.type = 'language';}else if(UI_ELEMENT_PSEUDO_CLASSES.has(result.val)){result.type = 'ui element';}else if(STRUCTURAL_PSEUDO_CLASSES_REGEX.test(result.val)){result.type = 'structural';}else if(/:contains\(.*\)/.test(result.val)){result.type = 'blank';}else if(/:not\(.*\)/.test(result.val)){result.type = 'negation';}else if(PSEUDO_ELEMENTS.has(result.val)){result.type = 'element';}else {result.type = 'non-standard';}return result;}
//# sourceMappingURL=selector.js.map