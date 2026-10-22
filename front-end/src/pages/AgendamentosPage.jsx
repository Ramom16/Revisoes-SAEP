import { useEffect, useState } from "react";
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

    const [ordenacao, setOrdenacao] = useState('dia');

    const handleMudarOrdenacao = (novaOrdenacao) =>{
        setOrdenacao(novaOrdenacao);
    }

    useEffect(()=>{
        const agendamentosOrdenados = [...agendamentos];

        if (ordenacao == 'dia'){
            agendamentosOrdenados.sort((a,b)=> new Date(a.dataAgendamento) - new Date(b.dataAgendamento));
        }

        if (ordenacao == 'mes'){
            agendamentosOrdenados.sort((a,b)=> new Date(a.dataAgendamento).getMonth() - new Date(b.dataAgendamento).getMonth());
        }

        if (ordenacao == 'ano'){
            agendamentosOrdenados.sort((a,b)=> new Date(a.dataAgendamento).getFullYear() - new Date(b.dataAgendamento).getFullYear());
        }

        setAgendamentos(agendamentosOrdenados);
    }, [ordenacao]);
    
    const handleSalvar = (dadosAgendamento) => {
        const novoAgendamento = {
            ...dadosAgendamento,
            id: crypto.randomUUID
        }
        setAgendamentos(agendamentos => [...agendamentos, novoAgendamento])
    }

    const [agendamentoForm, setAgendamentoForm] = useState(null);
    const handleSalvarNovaData = (novaData) => {
        setAgendamentos(agendamentos.map(
            agendamento =>{
                if (agendamento.id == agendamentoForm.id) {
                    return {...agendamento, dataAgendamento: novaData}
                }

                return agendamento;
            }
        ))

        setAgendamentoForm(null);
    }

    return(
        <div>
                    <h3>Gerenciamento de Agendamentos</h3>
        
                    <AgendamentoForm
                        onSalvar={handleSalvar}
                        veiculos={veiculos}
                    />

                    <span>Critério de Ordenação:</span>
                    <button onClick={()=> handleMudarOrdenacao('dia')}>Por dia</button>
                    <button onClick={()=> handleMudarOrdenacao('mes')}>Por Mês</button>
                    <button onClick={()=> handleMudarOrdenacao('ano')}>Por Ano</button>
        
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