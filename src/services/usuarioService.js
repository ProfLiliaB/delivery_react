// A URL base da API vem de uma variável de ambiente (arquivo .env) 
const apiUrl = import.meta.env.VITE_API_URL;

// Função assíncrona: o async indica que a operação depende de resposta externa.
export async function fazerLogin(email, senha) {
  // fetch faz uma requisição HTTP 
  const resposta = await fetch(`${apiUrl}/usuario/login`, {
    // Define o método da requisição: POST é usado para criar/enviar dados.
    method: "POST",
    // cabeçalhos
    headers: {
      // informam o tipo de conteúdo: JSON é o padrão para APIs REST
      "Content-Type": "application/json",
    },
    // credentials: "include" permite que cookies/sessões sejam enviados e armazenados.
    credentials: "include",
    // body converte o objeto em JSON para o backend entender os dados enviados.
    body: JSON.stringify({
      usuario_email: email,
      usuario_senha: senha,
    }),
  });

  // Converte a resposta do servidor em um objeto JavaScript.
  const resultado = await resposta.json();

  // Verifica se a requisição foi bem-sucedida; resposta.ok representa status HTTP 2xx.
  if (!resposta.ok) {
    // Em casos de erro, lançamos uma exceção para interromper o fluxo e mostrar a mensagem.
    throw new Error(resultado.error);
  }

  // Se tudo deu certo, retorna o payload (corpo da resposta) da API.
  return resultado;
}
