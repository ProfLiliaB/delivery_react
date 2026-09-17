# Projeto Delivery com React

## API

- Leia a documentação da API
- documentação: https://delivery-umtc.onrender.com/api-docs
- endpoint: https://delivery-umtc.onrender.com

### Siga os passos

- instalar biblioteca `npm install react-router-dom` (gerenciar rotas)
- Criar página `Login` e `Home` em 'pages'
- Mover conteúdo de `<App />` para `<Home />`
- Em `<App />` definir as rotas
- Criar páginas para Dashboard `Admin|Cliente|Loja` em 'pages'
- Criar página `Carrinho` em 'pages'
- Criar `produtoService` e `usuarioService` em 'services'
- Criar pasta 'hooks' (controlador de estados)
- dentro de hooks terá `useCarrinho.js`, `useProdutos.js` e `useUsuario.js`
- colocar uma imagem padrão `images.jpg` dentro da pasta 'public'
- Ao final de tudo enviar para _GitHub_

---

### App.jsx

```jsx
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);
```

### .env

- Crie o arquivo `.env` na raiz do projeto

```env
  VITE_API_URL=https://delivery-umtc.onrender.com/api
```

### usuarioService.js

```js
const apiUrl = import.meta.env.VITE_API_URL;

export async function fazerLogin(email, senha) {
  const resposta = await fetch(`${apiUrl}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      usuario_email: email,
      usuario_senha: senha,
    }),
  });
  
  const resultado = await resposta.json();
  if (!resposta.ok) {
    throw new Error(resultado.error);
  }
  return resultado;
}
```

### produtoService.js

```js
const urlApi = import.meta.env.VITE_API_URL; // base da API

export async function listarProdutos(id) {
  const resposta = await fetch(`${urlApi}/lojas/${id}/produtos`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json", 
    },
  });

  const resultado = await resposta.json(); 

  if (!resposta.ok) {
    throw new Error(resultado.error);
  }

  return resultado.data.map((produto) => ({
    id: produto.id_produto, // id do produto
    nome: produto.produto_nome, // nome
    preco: produto.produto_valor, // valor
    imagem: "/images.jpg", // imagem padrão
  }));
}
```

### Carrinho.jsx

```jsx
import "../styles/ModalCarrinho.css";
export default function ModalCarrinho({ itens, aoFechar }) {
  function finalizarPedido() {
    aoFechar();
    // redirecionar para /checkout
  }
  return (
    <div className="carrinho_modal">
      <div className="carrinho_conteudo">
        <button className="btn_fechar" onClick={aoFechar}>X</button>
        <h2>Seu Pedido</h2>
        
        {itens.length === 0 ? (<div>Carrinho vazio.</div>)
        : (<ul>
            {itens.map((item) => (
              <li key={item.id}>
                <span>{item.nome}</span> x <span>{item.quantidade}</span>{" "}
                <span>R$ {item.valor.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={finalizarPedido}>Fechar pedido</button>
      </div>
    </div>
  );
}
```

### Estilo do Carrino /styles

```css
.carrinho_modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.carrinho_conteudo {
  width: 400px;
  height: 100vh;
  box-sizing: border-box;
  background-color: white;
  padding: 24px;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: deslizarDaDireita 0.3s ease-out;
}

.carrinho_conteudo ul {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 0;
}

@keyframes deslizarDaDireita {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.btn_fechar {
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
}

.btn_fechar:hover {
  color: #ff4747;
}

.carrinho_conteudo h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}

.btn_finalizar {
  margin-top: auto;
  background-color: #ff4747;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.btn_finalizar:hover {
  background-color: #e63939;
}
```

---

### /hooks

#### useCarrinho.js
```js
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
```

#### useUsuario.js
```js
import { useState } from 'react';
import { fazerLogin } from '../services/usuarioService';

export function useUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    setErro('');
    setCarregando(true);

    try {
      const resultado = await fazerLogin(email, senha);
      return resultado;
    } catch (error) {
      setErro(error.message);
      return null;
    } finally {
      setCarregando(false);
    }
  }
  
  return {
    email,
    senha,
    erro,
    carregando,
    setEmail,
    setSenha,
    entrar,
  };
}
```

#### useProdutos.js
```js
import { useEffect, useState } from 'react';
import { listarProdutos } from '../services/produtoService';

export function useProdutos(idLoja) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
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
```