import { useState } from "react";
import AgendamentoForm from "../components/AgendamentoForm.jsx";

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

const agendamentosMockados = [
    {
        id: 1,
        veiculoId: 1,
        dataAgendamento: "2026-10-31T09:00:00",
        descricaoServico: "Troca de óleo",
        status: "Agendado"
    },
    {
        id: 2,
        veiculoId: 2,
        dataAgendamento: "2026-11-01T14:30:00",
        descricaoServico: "Revisão completa",
        status: "Agendado"
    }
]

export default function AgendamentosPage() {
    const [agendamentos, setAgendamentos] = useState(agendamentosMockados);
    const [veiculos, setVeiculos] = useState(veiculosMockados);
    
    const handleSalvar = (dadosAgendamento) => {
        const novoAgendamento = {
            ...dadosAgendamento,
            id: crypto.randomUUID
        }
        setAgendamentos(agendamentos => [...agendamentos, novoAgendamento])
    }

    return(
        <div>
                    <h3>Gerenciamento de Agendamentos</h3>
        
                    <AgendamentoForm
                        onSalvar={handleSalvar}
                        veiculos={veiculos}
                    />
        
                    <table>
                        <thead>
                            <tr>
                                <th>Data e horário</th>
                                <th>Serviço</th>
                                <th>Veículo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                agendamentos.map(
                                 agendamentos => (
                                    <tr key={agendamentos.id}>
                                        <td>
                                        {new Date(agendamentos.dataAgendamento).toLocaleDateString('pt-BR')}
                                        {new Date(agendamentos.dataAgendamento).toLocaleTimeString('pt-BR')}
                                        </td>

                                        <td>{agendamentos.descricaoServico}</td>

                                        <td>
                                            {
                                                veiculos.map(
                                                    veiculos => veiculos.id == agendamentos.veiculoId && `${veiculos.modelo} ${veiculos.ano}`
                                                )
                                            }
                                        </td>

                                        <td>
                                            <button>
                                                Alterar Data
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
    )
}