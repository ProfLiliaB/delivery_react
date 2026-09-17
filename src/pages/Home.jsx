import { useState } from 'react';
import Main from '../componentes/Main'
import Header from '../componentes/Header'
import { useProdutos } from '../hooks/useProdutos'
import { useCarrinho } from '../hooks/useCarrinho'
import Spinner from '../componentes/Spinner'
import Carrinho from '../pages/Carrinho';

function Home() {
    const { produtos, carregando, erro } = useProdutos(1);// <= coloque o id da sua loja
    const { carrinho, adicionarAoCarrinho } = useCarrinho(produtos);
    const [carrinhoAberto, setCarrinhoAberto] = useState(false);

    return (
        <>
            <Header
                nomeLoja="Sabor da Casa"
                quantidadeCarrinho={carrinho.length}
                // aoAbrirCarrinho={() => alert('Carrinho vazio')}
                aoAbrirCarrinho={() => setCarrinhoAberto(true)}
            />
            
            {carrinhoAberto && (
                <Carrinho 
                    itens={carrinho} 
                    aoFechar={() => setCarrinhoAberto(false)} 
                />
            )} 
           

            {carregando && <Spinner tamanho={32} />}

            {erro && <div>{erro}</div>}

            {!carregando && !erro && (
                <Main produtos={produtos} aoAdicionar={adicionarAoCarrinho} />
            )}
        </>
    );
}

export default Home;