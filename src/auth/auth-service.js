const bcrypt = require('bcryptjs')
const AuthService = {
    getUserWithUserEmail(db, user_email) {
      console.log(user_email)
      return db('users')
        .where({ user_email })
        .first()
    },
    comparePasswords(password, hash) {
      return bcrypt.compare(password, hash)
    },
    parseBasicToken(token) {
      return Buffer
        .from(token, 'base64')
        .toString()
        .split(':')
    },
  }
  
  module.exports = AuthService
  