import parse from 'css-parse';
import css from 'css'
import fs from 'fs';
import cheerio from 'cheerio';

export default function Useless(html) {
  let $ = cheerio.load(html)
  let links = $('link[href$=".css"]')
  let result = []
  Object.keys(links).forEach((key, index) => {
    if (index < links.length) {
      let element = links[key]
      let href = element.attribs.href
      let ast = convertLocalFile($, href)
      result.push(css.stringify(ast));
    }
  })
  return result
}

function convertLocalFile($, path) {
  let ast = parse(fs.readFileSync(path).toString());
  let candidateRules = ast.stylesheet.rules;
  let activeRules = candidateRules.filter((rule) => {
    switch (rule.type) {
      case "rule":
        var result = false;
        rule.selectors.forEach((selector) => {
          selector = selector.replace( /(\(|\)|=|\"|@|:|\.|\[|\]|,)/g, '\\$1' ); //" <-- atom gets confused
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
  });
  ast.stylesheet.rules = activeRules;
  return ast
}
