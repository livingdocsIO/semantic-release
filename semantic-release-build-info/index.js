const envCi = require('env-ci')
const path = require('path')
const fs = require('fs').promises

module.exports = {
  async prepare (pluginConfig) {
    const packageFile = path.resolve('./package.json')
    const packageJson = JSON.parse(await fs.readFile(packageFile, 'utf8'))
    const keyName = pluginConfig.keyName || 'ci'

    const ciVars = envCi()
    ciVars.date = new Date().toISOString()
    packageJson[keyName] = ciVars

    return fs.writeFile(packageFile, JSON.stringify(packageJson, null, 2))
  }
}
