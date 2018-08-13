const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('./middlewares');

const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 14);
  db('users')
    .insert(user)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // req.session.username = user.username;
          const token = generateToken(user);

          res.send(token);
          // res.status(201).json(user);
        });
    })
    .catch(err => {
      res.status(500).json({ err });
      console.log(err);
    });
}

function login(req, res) {
  // implement user login
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      //check for pw match
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);

        //attach token to response
        res.send(token);
      } else {
        res.status(401).json({ error: 'wrong password' });
      }
    })
    .catch(err => res.status(500).json({ err }));
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
