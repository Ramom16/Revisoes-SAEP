import pool from '../config/database.js'

async function resumo(req, res) {
    try {
        const [[{ total_clientes}]] = await pool.query(
            `SELECT COUNT(*) as total_clientes FROM clientes`
        );
        const [[{ total_veiculos}]] = await pool.query(
            `SELECT COUNT(*) as total_veiculos FROM veiculos`
        );
        const [[{ total_agendamentos}]] = await pool.query(
            `SELECT COUNT(*) as total_agendamentos FROM agendamentos`
        );

        const estatisticas = {
            total_clientes,
            total_veiculos,
            total_agendamentos
        }
        return res.json({
            // usuarioLogado: req.usuario,
            estatisticas
        })
    } catch (error) {
        console.error("Erro no resumo do dashboard: ", error);
        return res.status(500).json({
            error: "Erro ao obter dados do dashboard"
        });
    }
}

export default {resumo}