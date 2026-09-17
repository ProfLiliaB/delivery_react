import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ nomeLoja, quantidadeCarrinho, aoAbrirCarrinho }) {
	const usuarioLogado = sessionStorage.getItem('nomeUsuario');

	return (
		<header className="cabecalho">
			<div>
				{/* <div className="cabecalho__rotulo">Delivery</div> */}
				<h1>{nomeLoja}</h1>
			</div>

			<nav className="cabecalho__navegacao">
				<Link to="/">Início</Link>
			</nav>

			{usuarioLogado ? (
				<div className="cabecalho__usuario">
					<span>Bem vindo, <b>{usuarioLogado}</b></span>
				</div>
			) : null}

			<button className="cabecalho__carrinho" onClick={aoAbrirCarrinho}>
				Carrinho ({quantidadeCarrinho})
			</button>
		</header>
	);
}

export default Header;

/*import '../styles/Header.css';
import { useContext } from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';

function Header({ nomeLoja }) {
	// Conectando ao contexto para ler o array do carrinho
	const { carrinho } = useCarrinho();

	return (
		<header className="cabecalho">
			<div>
				<p className="cabecalho__rotulo">Delivery</p>
				<h1>{nomeLoja}</h1>
			</div>
			<nav className="cabecalho__navegacao">
				<a href="#inicio">Início</a>
				<a href="#cardapio">Cardápio</a>
			</nav>
			<button className="cabecalho__carrinho" onClick={() => alert('Abrir modal')}>
				Carrinho ({carrinho.length})
			</button>
		</header>
	);
}

export default Header;*/