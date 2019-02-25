
const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  // Logger should be the last middleware
  middlewares.push(logger);
}

export default middlewares;
