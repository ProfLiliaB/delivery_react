import Spinner from './Spinner';

function Botao({
    texto,
    acao,
    tipo = 'button',
    carregando = false,
    desabilitado = false,
    className = '',
}) {
    return (
        <button
            onClick={acao}
            type={tipo}
            disabled={desabilitado || carregando}
            className={className}
        >
            {carregando ? <Spinner /> : texto}
        </button>
    );
}

export default Botao;