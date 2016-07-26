import { docopt } from 'docopt'
import Useless from './uselesscss'
import fs from 'fs'

const usage =
`
usage:
  uselesscss [options] <html> ([-] | [<css>])

options:
  -h --help  Show this message
  --version  Print version`

let args = docopt(usage, { version: '0.0.1' })

let html = fs.readFileSync(args['<html>'], 'utf8')
let css = ''

if (args['-']) {
  process.stdin.setEncoding('utf8')
  process.stdin.on('readable', () => {
    let chunk = process.stdin.read()
    if (chunk != null) {
      css += chunk
    }
  })
  process.stdin.on('end', () => {
    process.stdout.write(Useless(html, css))
  })
} else if (args['<css>']) {
  css = fs.readFileSync(args['<css>'], 'utf8')
  process.stdout.write(Useless(html, css))
}
