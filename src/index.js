import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./Calculator";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Calculator />
  </React.StrictMode>,
  document.getElementById("root")
);
