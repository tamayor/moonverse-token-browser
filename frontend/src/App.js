import React from "react";
import TokenBalance from "./TokenBalance";
import moonverseLogo from './moonverse logo.png';
import './App.css';
function App() {
  return (
    <div className="App">
      <img className="moonverse-logo-display" src={moonverseLogo} alt="moonverse logo"/>
      <img className="moonverse-logo-display-2" src={moonverseLogo} alt="moonverse logo"/>
      <h1>Token Balances</h1>
      <TokenBalance />
      
    </div>
  );
}

export default App;
