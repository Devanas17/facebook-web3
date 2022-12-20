import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

export const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    try {
          const { ethereum } = window;
          if (!ethereum) {
            alert("Make sure you have metamask!");
            return;
          } else {
            console.log("We have the ethereum object", ethereum);
          }
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
          } else {
            console.log("No authorized account found");
          }
        } catch (error) {
          console.log(error);
          throw new Error("No Ethereum object.");
        }
      };
    
      const connectWallet = async () => {
        try {
          const { ethereum } = window;
          if (!ethereum) {
            alert("Make sure you have Metamask");
          }
    
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("Connected", accounts[0]);
          localStorage.setItem('isWalletConnected', true)
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error);
          throw new Error("No Ethereum object found!");
        }
      };
    
    return (
        <AppContext.Provider value={{currentAccount, connectWallet}}>
          {children}
        </AppContext.Provider>
      );
}