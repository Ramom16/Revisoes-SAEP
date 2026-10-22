import { useState } from "react";

export default function VeiculoForm({ onSalvar, clientes }) {
    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: '',
        clienteId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar(formData);

        setFormData({
            placa: '',
            modelo: '',
            marca: '',
            ano: '',
            clienteId: ''
        });
        
    }

    

    return (
        <div>
            <h5>
                Cadastrar Novo Veículo
            </h5>

            <form>
                <label>Placa do veículo: </label>
                <input type="text" name="placa" value={formData.placa} required onChange={handleChange} />

                <label>Modelo: </label>
                <input type="text" name="modelo" value={formData.modelo} required onChange={handleChange} />

                <label>Marca: </label>
                <input type="tel" name="marca" value={formData.marca} required onChange={handleChange} />

                <label>Ano: </label>
                <input type="number" name="ano" value={formData.ano} required onChange={handleChange} />

                <label>Proprietário do veículo:</label>
                <select name="clienteId" value={formData.clienteId} onChange={handleChange} required>
                    <option value=""> Selecione o Cliente</option>
                    {console.log(clientes)}
                    {
                        clientes.map(
                            (cliente)=>{
                                {console.log(cliente)}
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome} (CPF: {cliente.cpf})
                                </option>
                            }
                        )
                    }
                </select>

                <button type="submit" onClick={handleSubmit}>
                    Salvar Veiculo
                </button>
            </form>
        </div>
    );
}