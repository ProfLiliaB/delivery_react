// import { useNavigate } from 'react-router-dom';
import '../styles/ModalCarrinho.css';
export default function Carrinho({ itens, aoFechar }) {
    // const navigate = useNavigate(); // Hook para mudar de página

    function finalizarPedido() {
        aoFechar();
    }

    return (
        <div className="carrinho_modal">
            <div className="carrinho_conteudo">
                <button className="btn_fechar" onClick={aoFechar}>
                    X
                </button>
                <h2>Seu Pedido</h2>
                {itens.length === 0 ? (
                    <p>Carrinho vazio.</p>
                ) : (
                    <ul>
                        {itens.map((item) => (
                            <li key={item.id}>
                                <span>{item.nome}</span> x <span>{item.quantidade}</span> <span>R$ {item.preco.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <button onClick={finalizarPedido}>Fechar pedido</button>
            </div>
        </div>
    );
}