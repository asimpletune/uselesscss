import cssLib from 'css'
import cheerio from 'cheerio'
import cssesc from 'cssesc'

/**
 * Useless(html, css) -> css
 */
export default function Useless (html, css) {
  var $ = cheerio.load(html)
  return reduceCss(css)

  function reduceCss (css) {
    let ast = cssLib.parse(css || '')
    let candidateRules = ast.stylesheet.rules

    let activeRules = candidateRules.map((rule) => {
      switch (rule.type) {
        case 'rule':
          rule.selectors = rule.selectors.filter(filterSelector)
          return rule.selectors.length === 0 ? null : rule
        case 'media':
          rule.rules = rule.rules.filter((rule) => {
            return rule.type === 'rule'
          }).map((rule) => {
            rule.selectors = rule.selectors.filter(filterSelector)
            return rule.selectors.length === 0 ? null : rule
          }).filter((rule) => {
            return rule !== null && rule !== undefined
          })
          return rule.rules.length === 0 ? null : rule
        case 'comment':
          // curently not including comments
          break
        case 'keyframes':
          return rule
        case 'font-face':
          return rule
        default:
          console.error(`Unknown rule! Add ${rule.type} as case to switch on!`)
          return rule
      }
    }).filter((rule) => {
      return rule !== null && rule !== undefined
    })
    ast.stylesheet.rules = activeRules
    return cssLib.stringify(ast)
  }

  function filterSelector (selector) {
    let result = false
    let override = /(@|(:link)|(:visited)|:(active)|(:hover)|(:focus)|(:target)|(:lang)|(:disable)|(:enabled)|(:checked)|(::)|(:before)|(:after))/
    if (override.test(selector)) {
      if (/::/.test(selector)) {
        selector = selector.substring(0, selector.lastIndexOf('::'))
      } else {
        selector = selector.substring(0, selector.lastIndexOf(':'))
      }
    }
    let selection
    try {
      selection = $(selector)
    } catch (e) {
      selection = $(cssesc(selector, {isIdentifier: true}))
    }
    result = selection.length > 0
    return result
  }
}
