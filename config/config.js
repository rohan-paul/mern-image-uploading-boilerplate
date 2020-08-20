// Copied from config.example.js , with the proper database connection URI.
// You’ll need to copy the config/config.example.js to config/config.js . Change the Mongo values to work for your environment. For me, my dev environment is no username or password ( localhost:27017/db_name )

module.exports = {
  db: 'mongodb://localhost:27017/db',
  db_dev: 'mongodb://url:port/db',
};
