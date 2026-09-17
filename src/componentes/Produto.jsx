import '../styles/Produto.css'
import { useState } from 'react';
import Botao from './Botao';

function Produto({ id, nome, preco, imagem, aoClicar }) {
    const [quantidade, setQuantidade] = useState(1);

    return (
        <article className="produto">
            <img src={imagem} alt={nome} />
            <h2>{nome}</h2>
            <p>R$ {preco.toFixed(2)}</p>
            <div className="btn_qtd">
                <button
                    onClick={() => setQuantidade(quantidade - 1)}
                    disabled={quantidade === 1}
                >-</button>
                <span>{quantidade}</span>
                <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
            </div>
            <Botao
                texto="Comprar"
                acao={()=> aoClicar(id, quantidade)}
             />
        </article>
    );
}

/*function Produto(props) {
    //somente leitura, não pode ser alterado seu valor
    // console.log(props)
    return (
        <article>
            <h2>{props.nome}</h2>
            <p>R$ {props.preco.toFixed(2)}</p>
            <p>{props.descricao}</p>
        </article>
    );
}*/

export default Produto;