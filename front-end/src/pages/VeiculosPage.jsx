import { useState } from "react";
import VeiculoForm from "../components/VeiculoForm.jsx";

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

const veiculosMockados = [
    {
        id: 1,
        placa: "ABC-1234",
        modelo: "Palio",
        marca: "Fiat",
        ano: 2008,
        clienteId: 1
        },
    {
        id: 2,
        placa: "DEF-5678",
        modelo: "Civic",
        marca: "Honda",
        ano: 2011,
        clienteId: 2
    }
]

export default function VeiculosPage() {
    const [clientes, setClientes] = useState(clientesMockados);
    const [veiculos, setVeiculos] = useState(veiculosMockados);
    
    const handleSalvar = (dadosVeiculo) => {
        const novoVeiculo = {
            ...dadosVeiculo,
            id: crypto.randomUUID
        }
        setVeiculos(veiculos => [...veiculos, novoVeiculo])
    }

    return(
        <div>
                    <h3>Gerenciamento de Clientes</h3>
        
                    <VeiculoForm
                        onSalvar={handleSalvar}
                        clientes={clientes}
                    />
        
                    <table>
                        <thead>
                            <tr>
                                <th>Placa do carro</th>
                                <th>Modelo</th>
                                <th>Marca</th>
                                <th>Ano</th>
                                <th>Cliente Proprietário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculos.map(
                                veiculos => (
                                    <tr key={veiculos.id}>
                                        <td>{veiculos.placa}</td>
                                        <td>{veiculos.modelo}</td>
                                        <td>{veiculos.marca}</td>
                                        <td>{veiculos.ano}</td>
                                        <td>
                                            {
                                                clientes.map(
                                                    cliente => cliente.id == veiculos.clienteId && cliente.nome
                                                )
                                            }
                                        </td>
        
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
    )
}