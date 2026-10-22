import { useState } from "react";
import ClienteForm from "../components/ClienteForm";

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

export default function ClientePage() {
    const [clientes, setClientes] = useState(clientesMockados);
    const [clienteEditando, setClienteEditando] = useState(null);

    const handleCancelarEdicao = () => {
        
        setClienteEditando(null);
    }

    const handleSalvar = (dadosClientes) => {
        if (clienteEditando) {
            setClientes(clientes => clientes.map(cliente => cliente.id == clienteEditando.id ? { ...dadosClientes, id: clienteEditando.id } : cliente))
        } else {
            const novoCliente = {
                ...dadosClientes,
                id: Date.now(),
            };

            setClientes(clientes => [...clientes, novoCliente]);
        }
    }

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
                    {clientes.map(
                        cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.telefone}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <button onClick={() => { setClienteEditando(cliente) }} >Editar</button>
                                </td>

                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}