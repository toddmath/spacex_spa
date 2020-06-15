module.exports = {
  client: {
    includes: ['./src/**/*.js'],
    service: {
      name: 'spacex_launch_stats',
      localSchemaFile: './schema_spacex.graphql',
    },
  },
}
