import { useState } from "react";

export default function AgendamentoForm({ onSalvar, veiculos = [] }) {
    const [formData, setFormData] = useState({
        veiculoId: '',
        dataAgendamento: '',
        descricaoServico: '',
        status: 'Agendado'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);

        setFormData({
            veiculoId: '',
            dataAgendamento: '',
            descricaoServico: '',
            status: 'Agendado'
        });
    }

    return (
        <div>
            <h5>
                Novo agendamento
            </h5>

            <form onSubmit={handleSubmit}>
                <label>Veículo do Atendimento: </label>
                <select name="veiculoId" value={formData.veiculoId} onChange={handleChange} required>
                    <option value="">Selecione o Veículo</option>
                    {veiculos.map((veiculo) => (
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.modelo} ({veiculo.placa})
                        </option>
                    ))}
                </select>

                <label>Data e horário: </label>
                <input type="datetime-local" name="dataAgendamento" value={formData.dataAgendamento} required onChange={handleChange} />

                <label>Descrição do Serviço: </label>
                <textarea rows="2" name="descricaoServico" value={formData.descricaoServico} required onChange={handleChange} />

                <button type="submit">
                    Salvar Veiculo
                </button>
            </form>
        </div>
    );
}