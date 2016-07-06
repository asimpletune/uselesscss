import cssLib from 'css'
import cheerio from 'cheerio';

/**
 * Useless(html, css) -> css
 */
export default function Useless(html, css){
  var $ = cheerio.load(html)
  return reduceCss(css);

  function reduceCss(css) {
    let ast = cssLib.parse(css || '');
    let candidateRules = ast.stylesheet.rules;
    let activeRules = candidateRules.filter(filterCssRule)
    ast.stylesheet.rules = activeRules;
    return cssLib.stringify(ast)
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
        console.debug("Add a case for this!", rule.type);
    }
  }

  /**
   * Note: Leaving this here for now, but design of the tool has changed and probably won't do things this way any more
   * return [{uri, local}, ...]
   */
  function parseCssToLoad(html, only, ignore){
    let links = $('link[href$=".css"]'), result = [];
    Object.keys(links).forEach((key) => {
      if (!Number.isNaN(Number.parseInt(key))) {
        let el = links[key], obj = {};
        obj.uri = el.attribs.href,
        obj.local = obj.uri.charAt(0) === '.';
        result.push(obj)
      }
    })
    return result;
  }

  /**
   * Note: Leaving this here for now, but design of the tool has changed and probably won't do things this way any more
   */
  function loadLocalCss(path) {
    let workdir = options.workdir ? pathLib.resolve(options.workdir) : ''
    path = pathLib.join(workdir, path)
    return fs.readFileSync(path).toString()
  }

  /**
   * Note: Leaving this here for now, but design of the tool has changed and probably won't do things this way any more
   */
  function loadRemoteCss(href) {
    let baseurl = options.baseurl || ''
    return request('GET', baseurl + href).body.toString()
  }
}
