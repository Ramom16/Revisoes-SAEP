import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const tokensInvalidos = new Set();

function authMiddleware(req, res, next){
    const JWT_SECRET = process.env.JWT_SECRET;

    const authHeader = req.headers.authorization;
    //Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];

    if(!token || tokensInvalidos.has(token)){
        return res.status(401).json({
            error: "Acesso não autorizado. Faça login para continuar."
        })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: "Sessão expirada. Faça login novamente"
            })
        }

        req.usuario = decoded;
        next();
    })
}

export default authMiddleware;