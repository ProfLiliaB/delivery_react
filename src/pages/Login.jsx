import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import Campo from '../componentes/Campo';
import { useUsuario } from '../hooks/useUsuario';
import Botao from '../componentes/Botao';

function Login() {
    const navegar = useNavigate();
    const usuario = useUsuario();

    async function enviarFormulario(evento) {
        evento.preventDefault();
        const resultado = await usuario.entrar();

        if (resultado) {
            sessionStorage.setItem('nomeUsuario', resultado.data.usuario_nome);
            sessionStorage.setItem('tipoUsuario', resultado.data.usuario_tipo);
            const tipo = resultado.data.usuario_tipo.toLowerCase();
            navegar(`/${tipo}`);            
        }
    }

    return (
        <main className="login">
            <form className="login__formulario" onSubmit={enviarFormulario}>
                <div className="login__rotulo">Delivery</div>
                <h1>Entrar</h1>

                <Campo
                    rotulo="Email"
                    tipo="email"
                    valor={usuario.email}
                    aoAlterado={(evento) => usuario.setEmail(evento.target.value)}
                />

                <Campo
                    rotulo="Senha"
                    tipo="password"
                    valor={usuario.senha}
                    aoAlterado={(evento) => usuario.setSenha(evento.target.value)}
                />
                {/* o && é um operador que verifica se o valor é true antes de renderizar o conteúdo */}
                {usuario.erro && <div className="login__erro">{usuario.erro}</div>}

                <Botao
                    texto="Entrar"
                    tipo="submit"
                    carregando={usuario.carregando}
                />
            </form>
        </main>
    );
}

export default Login;
