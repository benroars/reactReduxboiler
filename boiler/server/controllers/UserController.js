const User = require('../models/UserModel.js');
const moment = require('moment');
const request = require('request');
const io = require('socket.io-emitter')({ host: process.env.REDIS_DB, port: 6379 });

module.exports = {
  getCurrentUser: (req, res) => {
    if (!req.session.user) {
      io.emit('action', { type: 'LOGOFF', data: '' });
      res.redirect('/');
    } else {
      const userID = req.session.user;
      User.where({ id: userID }).fetch()
      .then((currentUser) => {
        res.status(200).send(currentUser);
      })
      .catch((err) => {
        console.error(err);
      });
    }
  },

  getAllUsers: (req, res) => {
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);
    User.fetchAll()
    .then((users) => {
      users = users.toJSON().sort((a, b) => {
        if (a.totalXp < b.totalXp) {
          return 1;
        } else if (a.totalXp > b.totalXp) {
          return -1;
        }
        return 0;
      });

      res.status(200).send([users.slice(offset, offset + limit), users.length]);
    })
    .catch((err) => {
      console.error(err);
    });
  },

  getOneUser: (req, res) => {
    User.where({ id: req.path.split('/')[3] }).fetch()
    .then((currentUser) => {
      res.status(200).end(JSON.stringify(currentUser));
    })
    .catch((err) => {
      console.error(err);
    });
  },

  refreshUserData: (req, res) => {
    User.where({ id: req.path.split('/')[3] }).fetch()
    .then((currentUser) => {
      res.status(200).send(currentUser);
    })
    .catch((err) => {
      console.error('err', err);
    });
  },

  updateCurrentUser: (req, res) => {
    const data = req.body;
    User.where({ id: req.body.id }).fetch()
    .then((currentUser) => {
      currentUser.set({
        username: data.username,
        password: data.password,
      });
      currentUser.save().then((curr) => {
        res.status(200).end(JSON.stringify(curr));
      });
    })
    .catch((err) => {
      console.error(err);
    });
  },
};
