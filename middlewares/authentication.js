const { User } = require('../models');
const jwt = require('jsonwebtoken');
const errorResponse = require('../helpers/errorResponse');


const checkHeader = (headers) => {
  if (!headers.authorization) {
    return { code: 401, message: 'Unauthorized' }
  }

  const splitToken = headers.authorization.split(' ')
  if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
    return { code: 400, message: 'Wrong authorization format' }
  }

  return { code: 200, data: splitToken }
}

function isAuthenticate(req, res, next) {
  const resCheckHeader = checkHeader(req.headers);
  if (resCheckHeader.code !== 200) {
    res.status(resCheckHeader.code).json(errorResponse(resCheckHeader.message));
    return;
  }
  const splitToken = resCheckHeader.data;

  jwt.verify(splitToken[1], process.env.SECRET, { algorithms: ['HS256'] }, async (err, payload) => {
    if (err && err.name === 'TokenExpiredError') {
      res.status(401).json(errorResponse('Expired Token'));
    } else if (err) {
      res.status(401).json(errorResponse('Invalid Token'));
    } else {
      try {
        const user = await User.findOne({
          where: {
            id: payload.id,
          },
          attributes: [...User.getBasicAttribute()],
        });

        if (!user) {
          res.status(401).json(errorResponse('Invalid Token'));
          return;
        }

        next();
      } catch (err) {
        res.status(500).json(errorResponse(err.message));
      }
    }
  });
}

module.exports = isAuthenticate;
