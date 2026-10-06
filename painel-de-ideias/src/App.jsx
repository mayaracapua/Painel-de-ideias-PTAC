import { useState } from "react";

function App() {

  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function adicionarIdeia(event) {
    event.preventDefault();

    if (novaIdeia.trim() === "") {
      setErro("Digite uma ideia.");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false
    };

    setIdeias([...ideias, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function concluirIdeia(id) {

    const lista = ideias.map((ideia) => {

      if (ideia.id === id) {
        return {
          ...ideia,
          feita: !ideia.feita
        };
      }

      return ideia;

    });

    setIdeias(lista);

  }

  function removerIdeia(id) {

    const lista = ideias.filter((ideia) => ideia.id !== id);

    setIdeias(lista);

  }

  const concluidas = ideias.filter((ideia) => ideia.feita).length;

  return (

    <div className="container">

      <h1>Painel de Ideias</h1>

      <form onSubmit={adicionarIdeia}>

        <input
          type="text"
          placeholder="Digite uma ideia"
          value={novaIdeia}
          onChange={(event) => setNovaIdeia(event.target.value)}
        />

        <button type= "submit">
          Adicionar
        </button>

      </form>

      {erro && <p className="erro">{erro}</p>}

      <ul>

        {ideias.map((ideia) => (

          <li key={ideia.id}>

            <div>

              <input
                type="checkbox"
                checked={ideia.feita}
                onChange={() => concluirIdeia(ideia.id)}
              />

              <span className={ideia.feita ? "feita" : ""}>
                {ideia.texto}
              </span>

            </div>

            <button onClick={() => removerIdeia(ideia.id)}>
              X
            </button>

          </li>

        ))}

      </ul>

      <p>
        Total: {ideias.length} | Concluídas: {concluidas}
      </p>

    </div>

  );

}

export default App;