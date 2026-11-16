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
  async criar (req, res) {
          const {placa,modelo, marca, ano, cliente_id} = req.body;
  
          if(!placa || !modelo || !marca || !ano || !cliente_id ){
              return res.status(400).json({error: 'Verifique os dados enviados'});
          }
  
          try {
              const [rows]= await pool.query(
                  `INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) VALUES (?,?,?,?,?)`, [placa, modelo, marca, ano, cliente_id]
              )
  
              res.status(201).json({ message: 'Registro criado com sucesso', id: rows.insertId})
          } catch (error) {
              console.error('Erro ao criar veiculo: ', error);
              res.status(500).json(
                  {
                      error: 'Erro ao criar veiculo',
                      errorMessage: error.message
                  }
              )
          }
  }
  async editar(req, res){
    const {id} = req.params;
    const {placa, modelo, marca, ano} = req.body;
    try {
      const [result] = await pool.query(
        `UPDATE veiculos SET placa = ?, modelo = ?, marca = ?, ano = ?`,[placa, modelo, marca, ano],
      )
      if(result.affectedRows === 0){
              return res.status(404).json({error: "Veiculo não encontrado."})
            };
    
            return res.json({message: "Veiculo atualizado com sucesso no DB"});
    } catch (error) {
      console.error('Erro ao editar veiculo: ', error);
              res.status(500).json(
                  {
                      error: 'Erro ao editar veiculo',
                      errorMessage: error.message
                  }
              )
    }
  }
}

export default new VeiculoController();
