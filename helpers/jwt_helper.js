const JWT = require('jsonwebtoken');

const createError = require('http-errors');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((reslove, reject) => {
      const payload = {};
      const options = {
        expiresIn: '1h',
        issuer: 'lokesh',
        audience: userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        reslove(token);
      });
    });
  },
  verifyAccessToken: (req, _res, next) => {
    if (!req.headers['authorization']) {
      return next(createError.Unauthorized());
    }
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (payload) {
        req.payload = payload;
        return next();
      } else if (err.name === 'JsonWebTokenError') {
        return next(createError.Unauthorized());
      } else {
        return next(createError.Unauthorized(err.message));
      }
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((reslove, reject) => {
      const payload = {};
      const options = {
        expiresIn: '1y',
        issuer: 'lokesh',
        audience: userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        reslove(token);
      });
    });
  },
  verifyRefreshToken: (refreshtoken) => {
    return new Promise((reslove, reject) => {
      JWT.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized());
          }
          const userId = payload.aud;
          reslove(userId);
        }
      );
    });
  },
};
