import { verify } from 'jsonwebtoken';
import config from '../config';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
    if (!token) return res.sendStatus(401);

    verify(token, config.app.jwt_secret, (err, user) => {
        if (err) 
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorize(roles = []) {
    return (req, res, next) => {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }
        if (roles.length && !roles.includes(req.user.role)) {
            return res.sendStatus(403);
        }
        next();
    };
}
