import 'console.table'
import 'mocha'
import fs from 'fs'
import { execSync } from 'child_process'

describe('Visual regression tests', function () {
  before(function () {
    this.timeout(8000)
    execSync('gem install percy-client')
  })
  describe('Run bootstrap through uselesscss against bootswatch.', function () {
    let bootswatchPath
    let bootstrapPath
    let uselessBootstrapCssPath
    let sitePath
    it('Should cause no differences between the master copy and the uselesscss version.', function () {
      this.timeout(20000)
      bootswatchPath = './test/html/bootswatch.html'
      bootstrapPath = './test/css/bootstrap.css'
      uselessBootstrapCssPath = './test/_site/bootstrap.useless.css'
      sitePath = './test/_site/'
      fs.writeFileSync(uselessBootstrapCssPath, execSync(`./bin/uselesscss ${bootswatchPath} ${bootstrapPath}`))
      execSync(`./bin/uselesscss ${bootswatchPath} ${bootstrapPath}`)
      execSync(`percy snapshot ${sitePath}`)
    })
  })
})
