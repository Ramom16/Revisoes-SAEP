import pool from "../config/database.js";

export class VeiculoController {
  async listar(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT
	    v.*, c.nome AS NomeCliente
    FROM veiculos v
    JOIN clientes c
	    ON v.cliente_id = c.id
    ORDER BY v.id DESC;`,
      );
      return res.json(rows);
    } catch (error) {
      console.error("Erro ao listar veículos: ", error);
      return res.status(500).json({
        error: "Erro ao buscar veículos",
        errorMessage: error.message,
      });
    }
  }
}

export default new VeiculoController();
