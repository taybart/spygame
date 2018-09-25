const defaults = {
  gameTimeout: 30 * 60 * 1000,
};

const dependents = {
  testing: {
    loglevel: 'error',
    express: {
      port: 3000,
    },
  },
  development: {
    loglevel: 'debug',
    express: {
      port: 3000,
    },
  },
  production: {
    loglevel: 'error',
    express: {
      port: 80,
    },
  },
};

const env = process.env.NODE_ENV;
if (Object.keys(dependents).indexOf(env) === -1) {
  throw new Error(`NODE_ENV is either not defined or not one of ${Object.keys(dependents)}`);
}

const config = { ...defaults, ...dependents[env] };

module.exports = config;
