import { docopt } from 'docopt'

const usage =
`usage:
  useless <html>

options:
  -h --help   Show this message
  --version   Print version
`

let args = docopt(usage, { version: '0.0.1' })
