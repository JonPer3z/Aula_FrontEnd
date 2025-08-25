import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [contador, setContador] = useState(0);
  const [exibirMensagem, setExibirMensagem] = useState(false);

  const incrementar = () => {
    setContador((contador) => contador + 1);
  };

  const alterarMensagem = () => {
    setExibirMensagem(!exibirMensagem);
  };

  useEffect(() => {
    console.log(`O contador foi atualizado ${contador}`);
  }, [contador]);

  useEffect(() => {
    console.log(`Exibir Mensagem ${exibirMensagem}`);
  }, [exibirMensagem]);

  return (
    <div>
      <h1>Contador Simples</h1>
      <p>Contador: {contador}</p>

      <div>
        <button onClick={incrementar}>Incrementar</button>
        <button onClick={alterarMensagem}>
          {exibirMensagem ? "Esconder Mensagem" : "Exibir Mensagem"}
        </button>
      </div>

      {exibirMensagem && <p>Esse é um exemplo de mensagem condicional</p>}
    </div>
  );
}

export default App;
