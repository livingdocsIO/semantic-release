const SemanticReleaseError = require('@semantic-release/error')

module.exports = {
  async verifyRelease (pluginConfig, context) {
    const baseBranch = context.config && context.config.branch
    const nextRelease = context.nextRelease
    if (!baseBranch || !nextRelease) return true

    const whitelist = pluginConfig.whitelist || []
    if (!whitelist.length) return true

    for (const condition of whitelist) {
      const regex = new RegExp(condition.baseBranch, 'g')
      if (regex.test(baseBranch) && !condition.types.includes(nextRelease.type)) {
        throw new SemanticReleaseError(
          `The '${nextRelease.type}' release type is not allowed.\n` +
          `The branch matching '${condition.baseBranch}' only allows the types ${condition.types.map((w) => `'${w}'`).join(', ')}.\n` + // eslint-disable-line max-len
          `Please update your commit messages.`
        )
      }
    }

    return true
  }
}
