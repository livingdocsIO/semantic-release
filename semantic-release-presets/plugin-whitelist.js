module.exports = {
  async verifyCondition (pluginConfig, context) {
    const {default: SemanticReleaseError} = await import('@semantic-release/error')
    if (context.options.branch) {
      throw new SemanticReleaseError(
        `The 'branch' option got replaced by 'branches' in semantic-release. ` +
        `Please update the 'releases' configuration in the package.json.`,
        'ENOTSUPPORTED'
      )
    }

    const nextRelease = context.nextRelease

    let branchName
    const branchObject = context.options.branches[0]
    if (typeof branchObject?.name === 'string') branchName = branchObject.name
    else if (typeof branchObject === 'string') branchName = branchObject

    if (!branchName || !nextRelease) return true

    const whitelist = pluginConfig.whitelist || []
    if (!whitelist.length) return true

    for (const condition of whitelist) {
      const regex = new RegExp(condition.baseBranch, 'g')
      if (regex.test(branchName) && !condition.types.includes(nextRelease.type)) {
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
