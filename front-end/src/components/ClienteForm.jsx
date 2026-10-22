import { useState } from "react";

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar }) {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);
        setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: ''
        });
        onCancelar();
    }

    const handleCancelar = () => {
        setFormData({
            nome: '',
            cpf: '',
            telefone: '',
            email: ''
        });
        onCancelar();
    }

    return (
        <div>
            <h5>
                {clienteEditando ? `Editando ✏️ ${clienteEditando.nome}` : 'Cadastrar Novo Cliente'}
            </h5>

            <form>
                <label>Nome Completo: </label>
                <input type="text" name="nome" value={formData.nome} required onChange={handleChange} />

                <label>CPF: </label>
                <input type="text" name="cpf" value={formData.cpf} required onChange={handleChange} />

                <label>Telefone: </label>
                <input type="tel" name="telefone" value={formData.telefone} required onChange={handleChange} />

                <label>E-mail: </label>
                <input type="email" name="email" value={formData.email} required onChange={handleChange} />

                {
                    clienteEditando && (
                        <button type="button">
                            Cancelar
                        </button>
                    )
                }
                <button type="submit" onClick={onCancelar}>
                    Salvar Cliente
                </button>
            </form>
        </div>
    );
}