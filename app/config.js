const config = {
  development : {
    db: {
      host:"localhost",
      port: 5432,
      database: 'queue',
      username: 'test',
      password: 'qwerty'
    },
  },
  production : {

  }
}
module.exports = config;