module.exports = (() => {
  const errors = {
    'NOT_FOUND': {
      status: 404,
      message: 'NOT FOUND',
    },
    'SERVER_ERROR': {
      status: 500,
      message: 'Internal server Error',
    },
    'NOT_AUTHORIZED': {
      status: 401,
      message: 'UNAUTHORIZED',
    },
  };
  return {
    retrieveError: (code) => {
      return errors[code];
    },
  };
})();
