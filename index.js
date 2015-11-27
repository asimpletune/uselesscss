import parse from 'css-parse';
import css from 'css'
import fs from 'fs';
import cheerio from 'cheerio';

let html = fs.readFileSync('index.html');

let $ = cheerio.load(html),
  ast = parse(fs.readFileSync('example.css').toString());

// console.log(JSON.stringify(ast));

let candidateRules = ast.stylesheet.rules;

let activeRules = candidateRules.filter((rule) => {
  var result = false;
  rule.selectors.forEach((selector) => {
    let selection = $(selector);
    if (selection.length > 0) {
      result = true;
    }
  });
  return result;
});

ast.stylesheet.rules = activeRules;

fs.writeFileSync('example.useless.css', css.stringify(ast));
