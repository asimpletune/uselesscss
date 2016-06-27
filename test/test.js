import mocha from "mocha"
import { assert } from "chai"
import { execSync } from 'child_process'
import Useless from '../src/useless'

describe('cli', function() {
  it('Should print help statement', () => {
    let expected =
`usage:
  useless <html>

options:
  -h --help   Show this message
  --version   Print version
\n`
    let actual = String(execSync('./bin/useless.js --help'))
    assert.strictEqual(expected, actual)
  })
});

describe('lib', function() {
  it('Should receive a string of HTML and return a string of CSS', () => {
    console.log(Useless(`<!doctype html>
    <html lang="">
      <head>
        <meta charset="utf-8">
        <title>Whatever makes Spence!</title>
        <meta name="author" content="Spencer Scorcelletti">
        <meta name="description" content="Spencer Scorcelletti's personal site.">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- build:css(.) styles/vendor.css -->
        <!-- bower:css -->
        <link rel="stylesheet" href="/bower_components/bootstrap/dist/css/bootstrap.css" />
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) styles/main.css -->
        <link rel="stylesheet" href="styles/about.css">
        <link rel="stylesheet" href="styles/blog.css">
        <link rel="stylesheet" href="styles/footer.css">
        <link rel="stylesheet" href="styles/intro.css">
        <link rel="stylesheet" href="styles/nav.css">
        <link rel="stylesheet" href="styles/projects.css">
        <link rel="stylesheet" href="styles/style.css">
        <!-- endbuild -->
      </head>
      <body class="personal-site">
        <!--[if lt IE 10]>
          <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->


        <header>
    <nav class="navbar navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a class="persian-pink" href="/">Home page</a></li>
            <li><a class="wild-watermelon" href="/about.html">About me</a></li>
            <li><a class="salmon" href="/resume.html">Resumé</a></li>
            <li><a class="saffron-mango" href="/projects">Projects</a></li>
            <li><a class="turquoise-blue" href="/blog">Blog</a></li>
            <li><a class="dodger-blue" href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
        </header>
        <section id="intro">
    <div class="flex-container">
      <div class="title-wrapper flex-container">
        <img class="img-circle logo" src="images/triangles.svg" alt="Spencer's logo" />
        <h1 class="title">Spencer Scorcelletti</h1>
        <h3 class="subtitle">
          <span class="career">software developer<span>
          <span class="occupation">artist</span>
          <span class="adjective">generally curious</span>
        </h3>
      </div>
      <div class="next-section-preview flex-container">
        <h6>
          <small>A little about me.</small>
        </h6>
      </div>
    </div>
        </section>
        <section id="about-me">
    <article class="lead">
      <p>Hello and welcome to my site! This site is about whatever makes Spence to me, thanks for coming.</p>

    <p>I'm a software developer working and living in San Francisco. I transplanted from Austin, TX, where I went to college for computer science, but also studied other things. Life in Austin was really cool, but I wanted to see what's going on here for myself.</p>

    <p>Currently, I work as a system's engineer at Salesforce, in their Compute Cloud, but I can actually do a little of everything.</p>

    <p>After a brief 11 month housing search, I finally found a good HQ in the Presidio, where I live with my roommates. There's a lot of jokes going around here (our household), ping pong, grab-ass, and screaming for no reason. It's a nightmare.</p>

    <p>My hobbies mostly revolve around making stuff, fixing things, and being silly. So besides programming, this includes chilling in my workshop while building shit, writing music, working on our house golf carts, etc... I also really like to clean?</p>

    <p>In general, I feel like a very multi-dimensional person, where programming happens to be my career, but my "occupation" is as an artist. I hope to use this site as a space to just be myself, and hopefully other people might like it too.</p>
    </article>
    <div role="group" class="see-more btn-group">
      <a href="/about" class="btn btn-primary btn-lg left" type="button">More about me</a>
      <a href="/resume" class="btn btn-primary btn-lg right" type="button">See my resume</a>
    </div>
        </section>
        <section id="portfolio">
    <h2>Projects</h2>
    <div class="container">
      <div class="row">
        <div class="col-md-4 persian-pink lead" data-readout-src="https://raw.githubusercontent.com/asimpletune/RequestHub.io/master/README.md">
        </div>
        <div class="col-md-4 wild-watermelon lead" data-readout-src="https://raw.githubusercontent.com/asimpletune/readout/master/README.md">
        </div>
        <div class="col-md-4 salmon lead" data-readout-src="https://raw.githubusercontent.com/asimpletune/conch.sh/master/README.md">
        </div>
      </div>
      <a href="/projects" type="button" class="btn btn-primary btn-lg">See all projects</a>
    </div>
        </section>
        <section id="blog">
    <div id="table-of-contents" class="lead">
      <ul class="h2">
      </ul>
      <div class="see-more">
        <a href="/blog" type="button" class="btn btn-primary btn-lg">See more blog</a>
      </div>
    </div>
        </section>
        <footer>
    <div class="flex-container">
      <div class="social-media flex-item">
        <a class="facebook item" href="#"><img src="images/facebook-white-64px.png" alt="facebook contact" /></a>
        <a class="github item" href="#"><img src="images/github-white-64px.png" alt="github contact" /></a>
        <a class="twitter item" href="#"><img src="images/twitter-white-64px.png" alt="twitter contact"/></a>
      </div>
      <div class="ip flex-item">
        <a class="item" href="/">
          <img class="logo" src="/favicon.ico"/>
        </a>
        <span class="copyright-notice item">
          <span class="name">Spencer Scorcelletti</span>
          <span class="symbol">&copy;</span>
          <span class="year">2015</span>
        </span>
      </div>
      <div class="contact flex-item">
        <a class="call item" href="#">
          <span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>
        </a>
        <a class="email item" href="#">
          <span class="glyphicon glyphicon-send" aria-hidden="true"></span>
        </a>
        <a class="walk item" href="#">
          <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
        </a>
      </div>
    </div>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-70490247-1', 'auto');
      ga('send', 'pageview');

    </script>
    <script src="scripts/darkmode.js"></script>
        </footer>

        <!-- build:js(.) scripts/vendor.js -->
        <!-- bower:js -->
        <script src="/bower_components/jquery/dist/jquery.js"></script>
        <script src="/bower_components/showdown/dist/showdown.js"></script>
        <script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
        <!-- endbower -->
        <!-- endbuild -->



        <!-- build:js scripts/main.js -->
        <script src="scripts/readout.js"></script>
        <script src="scripts/darkmode.js"></script>
        <!-- endbuild -->
        <script type="text/javascript">
          $(function() {
            var titles =
            "Lorem ipsum dolor, sit amet, consectetur adipiscing elit., Aenean scelerisque, magna quis imperdiet, tincidunt, orci arcu sodales massa, mollis dignissim velit risus tempor dolor. Curabitur ultricies libero id erat dignissim, nec eleifend tellus accumsan. Integer nulla dolor, vehicula vitae mauris quis, porttitor auctor orci. Nam efficitur ex lectus, nec aliquet mi accumsan quis. Sed id metus vitae felis, scelerisque ultrices. Donec nec blandit neque, a ornare metus. Suspendisse in facilisis tortor. Cras lobortis sollicitudin neque at dignissim.Lorem ipsum dolor, sit amet, consectetur adipiscing elit., Aenean scelerisque, magna quis imperdiet, tincidunt, orci arcu sodales massa, mollis dignissim velit risus tempor dolor. Curabitur ultricies libero id erat dignissim, nec eleifend tellus accumsan. Integer nulla dolor, vehicula vitae mauris quis, porttitor auctor orci. Nam efficitur ex lectus, nec aliquet mi accumsan quis. Sed id metus vitae felis, scelerisque ultrices. Donec nec blandit neque, a ornare metus. Suspendisse in facilisis tortor. Cras lobortis sollicitudin neque at dignissim.Lorem elit., Aenean scelerisque, magna quis imperdiet, tincidunt, orci arcu sodales massa, mollis dignissim velit risus tempor dolor. Curabitur ultricies libero id erat dignissim, nec eleifend tellus accumsan. Integer nulla dolor, vehicula vitae mauris quis, porttitor auctor orci. Nam efficitur ex lectus, nec aliquet mi accumsan quis. Sed id metus vitae felis, scelerisque ultrices. Donec nec blandit neque, a ornare metus. Suspendisse in facilisis tortor. Cras lobortis sollicitudin neque at dignissim.Lorem".split(',');
            titles.forEach(function(el) {
              $("section#blog div#table-of-contents ul").append("<li>" + "Dec 1, 2013" + ": <a href=\"/blog/?post=" + "path" + "\">" + el + "</a></li>");
            });
            //TODO: put this back in after getting some content together
            // $.get("https://api.github.com/repos/asimpletune/asimpletune.github.io/git/trees/master", function(data) {
            //   var url = data.tree.filter(function(tree) {
            //     return tree.path == "blog";
            //   }).pop().url;
            //   $.get(url, function(data) {
            //     data.tree.forEach(function(el) {
            //       if (el.path.length > 10) {
            //         var dateString = el.path.slice(0, 10);
            //         var date = Date.parse(dateString);
            //         if (!isNaN(date)) {
            //           myEl = dateString;
            //           var hyphenated = el.path.slice(11), removeHyphens = hyphenated.replace(/(-)/g, " "), title = removeHyphens.substr(0, removeHyphens.lastIndexOf('.'));
            //           $("section#blog div#table-of-contents ul").append("<li>" + dateString + ": <a href=\"/blog/?post=" + el.path + "\">" + title + "</a></li>");
            //         }
            //       }
            //     })
            //   });
            // });
            Readout(function(el, html) {
              var indexOfSubheader = html.indexOf("<h2"),
                bound = (indexOfSubheader > -1) ? indexOfSubheader : html.length;
                el.innerHTML = html.substring(0, bound);
            });
          });
        </script>
      </body>
    </html>
`));
  })
});
