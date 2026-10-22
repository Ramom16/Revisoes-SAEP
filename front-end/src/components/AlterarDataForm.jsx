import { useState, useEffect } from "react";

export default function AlterarDataForm({ isOpen, agendamento, onSalvar, onFechar }) {
    const [novaData, setNovaData] = useState('');

    useEffect(() => {
        if (agendamento && agendamento.dataAgendamento) {
            setNovaData(agendamento.dataAgendamento);
        } else {
            setNovaData('');
        }

    }, [agendamento]);

    if (!isOpen || !agendamento) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!novaData) return;
        onSalvar(novaData);
    }

    return (
        <div>
            <h5>Alterar Data do Agendamento</h5>

            <form>
                <label>Nova data e horário</label>
                <input type="datetime-local" value={novaData} onChange={(e) => setNovaData(e.target.value)} required />

                <button onClick={onFechar}>Cancelar</button>
                <button onClick={handleSubmit}>Salvar Nova Data</button>
            </form>
        </div>
    )
}