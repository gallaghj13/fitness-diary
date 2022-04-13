const jwt = require('jsonwebtoken');
const secret = 'tempsecret';
const expiration = '2h';
module.exports = {
    authMiddleware({ req }) {
        let token = req.body.token  || req.query.token || req.header.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if(!token) {
            return req;
        }
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (err) {
            console.error(err);
            console.log('Invalid token');
        }
        return req;
    },
    signToken({ firstName, email, _id }) {
        const payload = { firstName, email, _id };
        return jwt.sign({ data: payload }, secret, { expireIn: expiration });
    },
};