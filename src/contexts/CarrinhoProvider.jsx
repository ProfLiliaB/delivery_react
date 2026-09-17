import { useState } from 'react';
import { produtos } from '../data/produtos';
import { CarrinhoContext } from '.contexts/CarrinhoContext'; 

export function CarrinhoProvider({ children }) {
    const [listaProdutos] = useState(produtos);
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (idProduto, quantidadeSelecionada) => {
        const produtoOficial = listaProdutos.find(p => p.id === idProduto);
        if (!produtoOficial) return;

        setCarrinho(carrinhoAtual => {
            const itemJaExiste = carrinhoAtual.find(item => item.id === idProduto);
            if (itemJaExiste) {
                return carrinhoAtual.map(item =>
                    item.id === idProduto
                        ? { ...item, quantidade: item.quantidade + quantidadeSelecionada }
                        : item
                );
            }
            return [...carrinhoAtual, {
                id: produtoOficial.id,
                nome: produtoOficial.nome,
                preco: produtoOficial.preco,
                quantidade: quantidadeSelecionada
            }];
        });
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, listaProdutos, adicionarAoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}