import { docopt } from 'docopt'

const usage = `
usage:
  useless <command>

options:
  -h --help   Show this message
  --version   Print version
`

let args = docopt(usage, { version: '0.0.1' })

import parse from 'css-parse';
import css from 'css'
import fs from 'fs';
import cheerio from 'cheerio';

let html = fs.readFileSync('example/index.html');

let $ = cheerio.load(html),
  ast = parse(fs.readFileSync('example/bootstrap.css').toString());

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

fs.writeFileSync('example/bootstrap.useless.css', css.stringify(ast));
