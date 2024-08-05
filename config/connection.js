const Sequelize = require('sequelize'); // importing Sequelize
require('dotenv').config(); //importing environment variables 'environment' wherever your application is running e.g.localc computer
//.config another JS library 
// process.env from node library
// operating system variables 

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, //grabbing your operating system variables ie. postgres initial set up 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost', // this tells you where to look for your databas 'local'host
      dialect: 'postgres',
    },
  );
}

module.exports = sequelize;
