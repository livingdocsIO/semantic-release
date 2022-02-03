const path = require('path')
const fs = require('fs').promises

module.exports = {
  async prepare (pluginConfig, context) {
    const packageFile = path.resolve('./package.json')
    const packageJson = JSON.parse(await fs.readFile(packageFile, 'utf8'))
    const keyName = pluginConfig.keyName || 'ci'

    packageJson[keyName] = {
      ...context.envCi,
      date: new Date().toISOString()
    }

    return fs.writeFile(packageFile, JSON.stringify(packageJson, null, 2))
  }
}
