//create the token
const expressJwt = require("express-jwt"); //secure the api libray

function authJwt() {
    // check if the user has the right token to access the api's
    const secret = process.env.secret;
    const api = process.env.API_URL;
    //build the token for al the apis except the unless
    return expressJwt({
        secret: secret,
        algorithms: ["HS256"], // alg of the token
        isRevoked: isRevoked, // spesify if the user is admin or not,
    }).unless({
        // to all these pathes don't check the token.. , and don't check the authentication. so you can just put this link in the browser to see it
        path: [
            /\/public\/uploads(.*)/,
            `${api}/users/login`,
            `${api}/users/register`,
            // the slashis is regular exprestions regex online
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
            { url: /\/api\/v1\/users(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/stores(.*)/, methods: ["GET", "OPTIONS"] },
        ],
    });
}
//req: what the user send
//payload: contains the data from the token
//in this funciton we spesify the roles: user and admin
async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        // if it's just a user.
        done(null, true); // reject the token.
    }
    done();
}

module.exports = authJwt;
