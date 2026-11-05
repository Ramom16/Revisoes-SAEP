import pool from "../config/database.js";
import cryptoService from "../utils/crypto.js";

export class AgendamentoController {
  async listar(req, res) {
    const { ordenarPor } = req.query; // dia, mes ou nao

    try {
      let orderByClause = `ORDER BY DATE (a.data_horario) ASC, a.data_horario ASC;`;

      if (ordenarPor === "mes") {
        orderByClause = `ORDER BY MONTH (a.data_horario) ASC, a.data_horario ASC;`;
      } else if (ordenarPor == "ano") {
        orderByClause = `ORDER BY YEAR (a.data_horario) ASC, a.data_horario ASC;`;
      }

      const sql = `
    SELECT
        a.id, a.data_horario, a.descricao_servico, a.status, c.id AS ID_CLIENTE, c.nome AS NOME_CLIENTE, c.cpf AS CPF_CLIENTE, c.telefone AS TELEFONE_CLIENTE, c.email AS EMAIL_CLIENTE,
        V.id as ID_VEICULO, v.placa AS PLACA_VEICULO, v.modelo AS MODELO_VEICULO, v.marca AS MARCA_VEICULO, v.ano AS ANO_VEICULO
    FROM agendamentos a
    JOIN veiculos v
	    ON a.veiculo_id = v.id
    JOIN clientes c
	    ON v.cliente_id = c.id
    ${orderByClause}
    `;

      const [rows] = await pool.query(sql);

      
      
      rows.forEach((row)=> {
          row.CPF_CLIENTE = cryptoService.decrypt(row.CPF_CLIENTE);
          console.log(cryptoService.decrypt(row.CPF_CLIENTE));
      });
    //   const agendamentos = rows.map ((row) => {
    //     id: row.id
    //     data_horario: row.data_horario
    //     descricao_servico: row.descricao_servico
    //     status: row.status
    //     cliente_id: row.cliente_id
    //     cliente_nome: row.cliente_nome
    //     id: row.id
    //     id: row.id
    //     id: row.id
    //     id: row.id
    //   })

      return res.json(rows);
    } catch (error) {
      console.error("Erro ao listar clientes: ", error);
      return res.status(500).json({
        error: "Erro ao buscar clientes",
        errorMessage: error.message,
      });
    }
  }
}

export default new AgendamentoController();
