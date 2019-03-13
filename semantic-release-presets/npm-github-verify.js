module.exports = {
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@livingdocs/semantic-release-build-info',
    ['@livingdocs/semantic-release-whitelist', {
      whitelist: [{
        baseBranch: '^release-',
        types: ['initial', 'patch']
      }]
    }],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
