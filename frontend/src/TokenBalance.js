import React, { useState } from "react";
import { fetchTokenBalances } from "./api";
import moonverseLogo from './moonverse logo.png';

const TokenBalances = () => {

  const [address, setAddress] = useState("");
  const [tokenBalances, setTokenBalances] = useState([]);
  const [newListInfo, setNewListInfo] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const balances = await fetchTokenBalances(address);
    if (balances) {
      setNewListInfo(true)
      setTokenBalances(balances);
    }
  };


  const handleConnectMetamask = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's accounts
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        // Get the selected account (user's wallet address)
        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (accounts.length > 0) {
            const selectedAddress = accounts[0];
            setAddress(selectedAddress);
          } else {
            console.error("No accounts found in Metamask.");
          }
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    } else {
      console.error("Metamask is not installed or not supported by the browser.");
    }
  };
function handleInputChange(e){
    if(e.target.value !== ""){
        setAddress(e.target.value)
    }else{
        setAddress("")
        setNewListInfo(false)
    }
}
  return (
    <div className="token-balance-wrapper">
      <form onSubmit={handleFormSubmit} className="token-balance--form">
        <input className="token-balance--input edges bg"
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your wallet address"
        />
        {address && <button className="token-balance--button edges bg" type="submit" >Get Token Balances</button>}
        {!address && <div><button className="token-balance--button-metamask edges bg" onClick={handleConnectMetamask }>Connect Metamask</button></div>}
      </form>
      {newListInfo &&
        <div className="token-list-container edges">
        <ul className="token-list">
          {tokenBalances.map((token, index) => (
            (token.balance > 0 && address) && (
              <div key={token.symbol}>
                <li className="token--info bg">
                  <span className="token-index">{index + 1}</span>
                  {token.logo != null ? <img src={token.logo} alt="token logo" className="token-logo" /> : <img src={moonverseLogo} alt="moonverse logo" className="moonverse-logo" />}
                  <h3 className="token-name">{token.name}</h3><h3 className="token-balance">{token.balance}</h3> <p className="token-symbol">{token.symbol}</p>
                </li>
                <hr />
              </div>
            )
          ))}
        </ul>
      </div>      
      }
    </div>
  );
};

export default TokenBalances;
