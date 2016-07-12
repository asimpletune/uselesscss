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

## TODO

* MORE test cases
* Write short comparison between this and similar tools, like uncss
* Show some real data on the amount of network bandwidth saved and improved load times
* Preserve input formatting in output
* Allow specifying a url (e.g. html that's generated would be hard to make use of this)
* Write section on how to incorporate this with dynamic selection of CSS
* -o | --output? Not sure when this would be necessary over redirection
* Publish to npm registry
