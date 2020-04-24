const jwt = require('jsonwebtoken');
const authConfig = require('../authConfig.json');

module.exports = (req,res,next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) 
        return res.status(401).send({error: 'No token provided'});

    const parts = authHeader.split(' ');
    
    if (!parts.length === 2)
        return res.status(401).send({error: 'Token error'});

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return res.status(401).send({error: 'Token malformatted'});

    jwt.verify(token, authConfig.secret, (error, decode)=>{
        if (error) res.status(401).send({error: 'Token invalid'});

        req.userId = decode.id;
        return next();
    });    
}