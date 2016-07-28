# uselesscss [![Build Status](https://travis-ci.org/asimpletune/uselesscss.svg?branch=dev)](https://travis-ci.org/asimpletune/uselesscss)
Trim bloat from your CSS by only including rules that will actually be active.

The goal behind this project is to speed up websites and make for cleaner resulting code by only including what you need. A perfect use case, for example, would be if you were using a large framework, like Bootstrap, in combination with a static site generator, like Jekyll.

## Install/Run

```bash
# clone repo and cd into project
npm install   # install dependencies
npm run build # build from source
./bin/uselesscss --help
```

## Usage

You can use uselesscss through the CLI or as a library

### CLI

```bash
usage:
  uselesscss [options] <html> ([-] | [<css>])

options:
  -h --help  Show this message
  --version  Print version
```

Where `<html>` and `<css>` are local paths to their respective files. Also, you can supply `-` instead of a `<css>`, to pass in STDIN or pipe in output from another program.

To save the resulting output, redirect it to a file. E.g.

```bash
./bin/uselesscss ~/index.html ~/Developer/my-site/big.css > ~/small.useless.css
```

The pipe syntax (i.e. `-`) is useful when used with a build pipeline or want to pass in a remote file. E.g.

```bash
curl -L https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css | ./bin/uselesscss ~/index.html - > bootstrap.useless.css
```

### Library

```js
var Useless = require('uselesscss')
var reducedCss = Useless(html, css)
```

Where `html` and `css` are strings.

## Example results

The following examples can be found in the [example](/example) section of this project. They can be generated easily by running

```bash
./bin/uselesscss example/foundation/kitchen_sink.html example/foundation/css/docs.css > example/foundation/css/docs.useless.css
./bin/uselesscss example/bootstrap/bootswatch.html example/bootstrap/css/bootstrap.css > example/bootstrap/css/bootstrap.useless.css
```

The resulting output is as follows:

| Framework  | HTML                                                       | Original CSS                                          | New CSS                                                               | Original size | New size | % reduction |
|------------|------------------------------------------------------------|-------------------------------------------------------|-----------------------------------------------------------------------|---------------|----------|-------------|
| Foundation | [kitchen_sink.html](/example/foundation/kitchen_sink.html) | [docs.css](/example/foundation/css/docs.css)          | [docs.useless.css](/example/foundation/css/docs.useless.css)          | 288KB         | 84KB     | 70%         |
| Bootstrap  | [bootswatch.html](/example/bootstrap/bootswatch.html)      | [bootstrap.css](/example/bootstrap/css/bootstrap.css) | [bootstrap.useless.css](/example/bootstrap/css/bootstrap.useless.css) | 146KB         | 48KB     | 67%         |

The above examples were chosen because their original intent is to demonstrate the full capabilities of their respective frameworks. Still, we see pretty good file size reductions. For more realistic projects, such as my [personal site](https://asimpletune.github.io), which make much more sparse use of such frameworks, the reduction is closer to 97%!

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
    * Write section on how to incorporate uselesscss with dynamic selection of CSS
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
  * A few "real world tests", i.e. bootswatch + bootstrap compared to bootswatch + bootstrap + uselesscss
  * Compare output to similar tools
  * Add benchmarking
  * Visual diffing
