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

  // retorna um objeto com as variáveis e funções para serem importados
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
