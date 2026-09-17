import { useState } from 'react';

export function useCarrinho(produtos) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarAoCarrinho(idProduto, quantidade) {
    const produto = produtos.find(item => item.id === idProduto);

    if (!produto) return;

    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === idProduto);

      if (itemExistente) {
        return carrinhoAtual.map(item => item.id === idProduto
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        );
      }

      return [
        ...carrinhoAtual,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
        },
      ];
    });
  }

  return { carrinho, adicionarAoCarrinho };
}
