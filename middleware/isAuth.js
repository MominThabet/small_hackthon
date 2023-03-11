const { Unauthorized, AccessDenied } = require('../utils/response/error/errors');
const { verifyAccessToken } = require('../utils/jwt');

async function isAuth(req, res, next) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    return next(new Unauthorized('Unauthorized'));
  }

  if (!authorization.startsWith('Bearer')) {
    return next(new Unauthorized('Unauthorized'));
  }

  const split = authorization.split(" ")[1];

  const token = split[1];

  try {
    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
      return next(new Unauthorized('Unauthorized'));
    }
    return next();
  } catch (err) {
    console.log(err);
    return next(new Unauthorized('Unauthorized'));
  }
}

module.exports = isAuth;
