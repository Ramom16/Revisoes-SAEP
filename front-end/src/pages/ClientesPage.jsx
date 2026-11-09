import { useState, useEffect } from "react";
import ClienteForm from "../components/ClienteForm";

/** 
 * 
const clientesMockados = [
    {
        id: 1,
        nome: 'Maycon',
        cpf: '123.456.789-10',
        telefone: '(11) 12345-1234',
        email: 'maycon@gmail.com'
    },
    {
        id: 2,
        nome: 'Murilo Reis',
        cpf: '234.567.890-01',
        telefone: '(11) 12346-1234',
        email: 'reizinho@gmail.com'
    }
];
*/

export default function ClientePage() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleCancelarEdicao = () => {
    setClienteEditando(null);
  };

  const handleSalvar = async (dadosClientes) => {
    if (clienteEditando) {
      setClientes((clientes) =>
        clientes.map((cliente) =>
          cliente.id == clienteEditando.id
            ? { ...dadosClientes, id: clienteEditando.id }
            : cliente,
        ),
      );
    } else {
      try {
        const resposta = await fetch("http://localhost:3001/api/clientes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosClientes),
        });

        const data = await resposta.json();

        const novoCliente = {
          ...dadosClientes,
          id: data.id,
        };

        setClientes((clientes) => [...clientes, novoCliente]);
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
      }
    }
  };

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const resposta = await fetch("http://localhost:3001/api/clientes");

        const data = await resposta.json();

        setClientes(data);
      } catch (error) {
        console.error(`Erro ao buscar clientes:`, error);
      }
    };
    buscarClientes();
  });

  return (
    <div>
      <h3>Gerenciamento de Clientes</h3>

      <ClienteForm
        onSalvar={handleSalvar}
        clienteEditando={clienteEditando}
        onCancelar={handleCancelarEdicao}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
              <td>
                <button
                  onClick={() => {
                    setClienteEditando(cliente);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
