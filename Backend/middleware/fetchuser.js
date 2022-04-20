import jwt from "jsonwebtoken";

const JWT_SECRET = 'THISisJWTsecretKEY$$$';
// const JWT_SECRET = process.env.JWT_SECRET;

function fetchuser(req, res, next) {
    // Get user from jwt token and id to req
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }
    try {
        const authUser = jwt.verify(token, JWT_SECRET);
        req.user = authUser.user;

        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token" })
    }

}

export default fetchuser;