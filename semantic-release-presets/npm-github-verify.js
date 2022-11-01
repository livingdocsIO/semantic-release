module.exports = {
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    require.resolve('./plugin-build-info'),
    [require.resolve('./plugin-whitelist'), {
      whitelist: [{
        baseBranch: '^release-',
        types: ['initial', 'patch']
      }]
    }],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
