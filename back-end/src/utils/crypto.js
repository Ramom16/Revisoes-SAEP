// Algoritmo: AES-256-CBC

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.CPF_SECRET_KEY || '12345678901234567890123456789012'); 
const initialIv = Buffer.from(process.env.CPF_IV || '1234567890123456');

function encrypt(text){
    if (!text) return text;
    try {
        const cipher = crypto.createCipheriv(algorithm,secretKey, initialIv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Erro ao criptografar', error);
        return text;
    }
}

function decrypt(encrypedText){
    if (!encrypedText) return encrypedText;
    try {
        const decipher = crypto.createDecipheriv(algorithm,secretKey, initialIv);
        let decrypted = decipher.update(text, 'utf8', 'hex');
        decrypted += decipher.final('hex');
        return decrypted;
    } catch (error) {
        console.error('Erro ao descriptografar', error);
        return encrypedText;
    }
}

export default {encrypt, decrypt};