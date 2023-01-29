const dotenv = require('dotenv');

dotenv.config();
const { env } = process;

module.exports = {
  JWT: env.JWT_KEY,
  PORT: env.PORT || 9000,
  MONGODBURI: env.MONGODBURI,
  
};