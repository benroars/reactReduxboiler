const db = require('../config/db.js');
// const Friend = require('./FriendModel.js');

const User = db.Model.extend({

  tableName: 'users',
  hasTimestamps: true,

  defaults: () => {
    return {
      username: null,
      password: null,
    };
  },

//  friends: () => this.hasMany(Friend),

});

module.exports = User;
