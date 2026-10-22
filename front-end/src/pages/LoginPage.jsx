import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        navigate('/clientes');
    }

    return (
        <div>
            <form>
                <label>
                    E-mail
                </label>
                <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>
                    Senha
                </label>
                <input type="password" placeholder="Digite sua senha" value={senha} required onChange={(e) => setSenha(e.target.value)} />
                <button type="submit" onClick={handleSubmit} >Entrar</button>

            </form>

            <div>
                {erro && (
                    <strong>Erro: {erro} </strong>
                )}
            </div>

        </div>
    );
}