import pool from "../configs/database.js";
import cryptoService from "../utils/crypto.js";

class AgendamentoController {
  async listar(req, res) {
    const { ordenarPor } = req.query;

    try {
      let orderByClause = `ORDER BY DATE (a.data_agendamento) ASC, a.data_agendamento ASC;`;

      if (ordenarPor == "mes") {
        let orderByClause = `ORDER BY MONTH (a.data_agendamento) ASC, a.data_agendamento ASC;`;
      } else if (ordenarPor == "ano") {
        let orderByClause = `ORDER BY YEAR (a.data_agendamento) ASC, a.data_agendamento ASC;`;
      }

      const sql = `select a.id, a.data_agendamento, a.descricao_servico, a.status, 
                        c.id as ID_CLIENTE, c.nome as NOME_CLIENTE, c.cpf as CPF_CLIENTE, 
                            c.telefone as TELEFONE_CLIENTE, c.email as EMAIL_CLIENTE,
                        v.id as ID_VEICULO, v.placa as PLACA_VEICULO, v.modelo as MODELO_VEICULO,
                            v.marca as MARCA_VEICULO, v.ano as ANO_VEICULO
                        from agendamentos a
                        join veiculos v
                            on a.veiculo_id = v.id
                        join clientes c
                            on v.cliente_id = c.id
                            ${orderByClause}`;

      const [rows] = await pool.query(sql);

      rows.forEach((row) => {
        row.cpf_cliente = cryptoService.decrypt(row.cpf_cliente);
      });

      return res.json(rows);
    } catch (error) {
      console.error("Erro ao listar cliente:", error);
      return res
        .status(500)
        .json({
          error: "Erro ao buscar cliente:",
          errorMessage: error.message,
        });
    }
  }
}
export default new AgendamentoController();
