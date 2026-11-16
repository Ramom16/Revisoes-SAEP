import 'dotenv/config';
import jwt from 'jsonwebtoken';
import pool from "../config/database.js"
import { tokensInvalidos } from '../middlewares/authMiddleware.js';

async function login(req, res) {
    const { email, senha } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!email || !senha){
        return res.status(400).json({
            error: "Informe e-mail e senha"
        });
    }
    try {
        const [rows] = await pool.query(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email]
        );

        const usuario = rows[0];

        if(!usuario || usuario.senha !== senha){
            return res.status(401).json({
                error: "E-mail ou senha inválidos. Tente novamente."
            });
        }

        const token = jwt.sign(
            {id: usuario.id, nome: usuario.nome, email: usuario.email},
            JWT_SECRET,
            {expiresIn: '2h'}
        );

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.json({
            message: 'Login realizado com sucesso!',
            token,
            usuario:{
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Erro no login: ', error);
              return res.status(500).json(
                  {
                      error: 'Erro ao fazer login',
                      errorMessage: error.message
                  }
              )
    }
}
async function logout(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split('')[1];

    if(token){
        tokensInvalidos.add(token);
    }

    return res.status(200).json({
        message: "Sessão encontrada com sucesso!"
    });
}

async function me(req, res) {
    return res.json({
        usuario: req.usuario
    })
}

export default {login, logout, me}