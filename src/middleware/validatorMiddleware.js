import jwt from 'jsonwebtoken';
import 'dotenv/config';

class validatorMiddleware {

    verify(req, res, next){

        const token = req.headers.token;

        if(!token) return res.json('Token is required');

        try {
            
            const { userId, typeToken } = jwt.verify(token, process.env.SECREET);
            req.typeToken = typeToken;
            req.userId = userId;

            next();

        } catch (error) {
            if(error.name == 'TokenExpiredError'){
                res.json(false);
            }else{
                res.json(false); // "JsonWebTokenError"
            }
        }

    }

}

export default new validatorMiddleware();