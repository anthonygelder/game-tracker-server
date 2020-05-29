const AuthService = {
    getUserWithUserEmail(db, user_email) {
      return db('users')
        .where({ user_email })
        .first()
    },
    parseBasicToken(token) {
      return Buffer
        .from(token, 'base64')
        .toString()
        .split(':')
    },
  }
  
  module.exports = AuthService
  