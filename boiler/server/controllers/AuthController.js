import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../jwt.config.json';

module.exports = {
  login: (req, res) => {
    const credentials = req.body;
    // Todo: Query DB, check if credentials in it, then send back JWT token
    if (credentials.user === 'admin' && credentials.password === 'password') {
      const profile = { user: credentials.user, role: 'ADMIN' };
      const jwtToken = jwt.sign(profile, jwtConfig.secret, { expiresIn: 5 * 60 });  // expires in 300 seconds (5 min)
      res.status(200).json({
        id_token: jwtToken,
      });
    } else {
      res.status(401).json({ message: 'Invalid user/password' });
    }
  },

  logout: (req, res) => {
    res.status(200).json({ message: 'User logged out' });
  },

  signup: (req, res) => {
    // Todo: QueryDB, check if credentials, if not, add into db with encryption / salt
    res.status(200).json({ message: 'Already Taken' });
  },

};
