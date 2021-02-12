// Modules
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {
        
        // Check if token was passed in header
        let token = req.headers.access_token;
        if(token) {
            
            jwt.verify(token, process.env.JWT_SECRET);

            next();
    
        } else {
    
            throw { message: 'Você não tem acesso a essa rota' };
            
        }
        
    } catch(err) {
        
        console.error(err.message);
        res.send({
            data: {},
            message: err.message,
            code: 400
        })

    }

}

module.exports = authMiddleware;