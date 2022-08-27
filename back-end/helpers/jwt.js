// const { expressJwt } = require("express-jwt");
// const expressJwt = require("express-jwt");

var { expressjwt: jwt } = require("express-jwt");

async function isRevoked(req, payload) {
  // console.log("isRevoked payload: ", payload.payload);
  // console.log("!payload.payload.isAdmin: ", !payload.payload.isAdmin);
  if (!payload.payload.isAdmin) {
    // done(null, true);
    // return;
    return payload !== "undefined";
  }
  // done();
  // return payload !== "undefined";
}

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      // { url: `${api}/products`, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/users(.*)/, methods: ["POST", "GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}

module.exports = authJwt;
