import React from "react";
import { GlobalStyle } from "./globalStyle";

import Routes from "./routes";

// JSX (JavaScript XML)
//quando não é preciso haver conteudo dentro da "tag" ela pode ser fechada nela mesma, não necessitando de um </ exemplo>

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
    </>
  );
}

export default App;
