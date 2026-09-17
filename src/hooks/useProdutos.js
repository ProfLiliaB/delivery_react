import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';

export function useProdutos(idLoja) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  // AO usar useEffect, você pode especificar uma lista de dependências (neste caso, [idLoja]) que determina quando o efeito deve ser reexecutado. Se idLoja mudar, o efeito será executado novamente para buscar os produtos da nova loja.
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const products = await listarProdutos(idLoja);
        setProdutos(products);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarProdutos();
  }, [idLoja]);

  return { produtos, carregando, erro };
}
