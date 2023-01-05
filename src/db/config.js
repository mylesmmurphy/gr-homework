const oldDBConfig = {
  host: process.env.DB_OLD_HOST,
  port: process.env.DB_OLD_PORT,
  database: process.env.DB_OLD_NAME,
  user: process.env.DB_OLD_USERNAME,
  password: process.env.DB_OLD_PASSWORD,
};

const newDBConfig = {
  host: process.env.DB_NEW_HOST,
  port: process.env.DB_NEW_PORT,
  database: process.env.DB_NEW_NAME,
  user: process.env.DB_NEW_USERNAME,
  password: process.env.DB_NEW_PASSWORD,
};

module.exports = {
  oldDBConfig,
  newDBConfig,
};
