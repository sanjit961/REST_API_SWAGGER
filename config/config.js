const config = {
  production: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
  },
  default: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
  },
};
exports.get = function get(env) {
  return config[env] || config.default;
};
