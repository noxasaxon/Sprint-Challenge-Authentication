const express = require('express');
const cors = require('cors');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set
  // this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
};
server.get('/', (req, res) => {
  res.sendStatus(201).json({ message: 'up and running' }); //throws error for modifying headers after send
});
server.use(express.json());
server.use(cors());

configureRoutes(server);

module.exports = {
  server
};
