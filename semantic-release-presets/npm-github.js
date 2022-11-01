module.exports = {
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    require.resolve('./plugin-build-info'),
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
