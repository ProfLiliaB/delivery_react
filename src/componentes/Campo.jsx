function Campo({ rotulo, tipo, valor, aoAlterado }) {
    return (
        <div className="campo">
            <label htmlFor={tipo}>{rotulo}</label>
            <input
                id={tipo}
                type={tipo}
                value={valor}
                onChange={aoAlterado}
            />
        </div>
    );
}

export default Campo;