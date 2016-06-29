import parse from 'css-parse';
import css from 'css'
import fs from 'fs';
import cheerio from 'cheerio';

/**
 * Useless(html, options) -> [css | { cssFileName: cssString, ... }]
 * {
 *  concat: bool [default: true],
 *  css: string,
 *  file: bool,
 *  ignore: [globPattern | [globPattern]],
 *  only: [globPattern | [globPattern]]
 * }
 */
export default function Useless(html, options){}

function loadLocalCss(path){}
function loadRemoteCss(href){}

function reduceCss(htmlString, cssString) {
  let $ = cheerio.load(html)
  let ast = parse(css);
  let candidateRules = ast.stylesheet.rules;
  let activeRules = candidateRules.filter(filterCssRule)
  ast.stylesheet.rules = activeRules;
  return css.stringify(ast)
}

function filterCssRule(rule) {
  switch (rule.type) {
    case "rule":
      var result = false;
      rule.selectors.forEach((selector) => {
        selector = selector.replace( /(\(|\)|=|\"|@|:|\.|\[|\]|,)/g, '\\$1' ); //" <-- atom, :(
        let selection = $(selector);
        if (selection.length > 0) {
          result = true;
        }
      });
      return result;
      break;
    /* TODO: these cases could be useful to consider, but I'll handle them later */
    case "comment":
      break;
    case "media":
      break;
    case "keyframes":
      break;
    case "font-face":
      break;
    default:
      console.log("Add a case for this!", rule.type);
  }
}
