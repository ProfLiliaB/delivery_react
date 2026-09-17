import { createContext, useContext } from 'react';

// O Contexto é exportado apenas para o Provider conectá-lo
export const CarrinhoContext = createContext();

// O Hook é exportado para as telas consumirem os dados
export function useCarrinho() {
    return useContext(CarrinhoContext);
}