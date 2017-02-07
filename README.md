# uselesscss [![Build Status](https://travis-ci.org/asimpletune/uselesscss.svg?branch=dev)](https://travis-ci.org/asimpletune/uselesscss)
Trim bloat from your CSS by only including rules that will actually be active.

The goal behind this project is to speed up websites and make for cleaner resulting code by only including what you need. A perfect use case, for example, would be if you were using a large framework, like Bootstrap, in combination with a static site generator, like Jekyll.

## Install/Run

```bash
# clone repo and cd into project
npm install   # install dependencies
npm run build # build from source
./bin/useless --help
```

## Usage

You can use useless through the CLI or as a library

### CLI

```bash
usage:
  useless [options] <html> ([-] | [<css>])

options:
  -h --help  Show this message
  --version  Print version
```

Where `<html>` and `<css>` are local paths to their respective files. Also, you can supply `-` instead of a `<css>`, to pass in STDIN or pipe in output from another program.

To save the resulting output, redirect it to a file. E.g.

```bash
./bin/useless ~/index.html ~/Developer/my-site/big.css > ~/small.useless.css
```

The pipe syntax (i.e. `-`) is useful when used with a build pipeline or want to pass in a remote file. E.g.

```bash
curl -L https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css | ./bin/useless ~/index.html - > bootstrap.useless.css
```

### Library

```js
var useless = require('useless')
var reducedCss = useless(html, css)
```

Where `html` and `css` are strings.

## TODO

* General  
  * Preserve input formatting in output
  * Publish to npm registry
  * Better selector parsing/engine (entirely new project)
  * Better selection algorithm (i.e. sort of memoize previous attempts to reduce always going to the selector engine)
  * Windows support
* Documentation
  * Write short comparison between this and similar tools, like uncss
  * Show some real data on the amount of network bandwidth saved and improved load times
  * Common how to:
    * Write section on how to incorporate useless with dynamic selection of CSS
    * Supply multiple files as args either through CLI or concatenating before hand
    * Sample pipeline from beginning to end
    * Suggestions on how to use on sites with many pages
* Lib
  * Add support for :target, :lang
* CLI  
  * Allow url as an arg (e.g. html that's generated at runtime would be hard to make use of this)
  * -o | --output
  * Include a flag to output what was excluded or save that output file
  * Ignore flag that maybe takes a regex
* Testing
  * Finish CLI tests
  * A few "real world tests", i.e. bootswatch + bootstrap compared to bootswatch + bootstrap + useless
  * Compare output to similar tools
  * Add benchmarking
