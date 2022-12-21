import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState();
  const ethereumClient = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContract(contract);
        return contract;
      }
    } catch (error) {
      console.log("Create Post Failed", error);
    }
  };

  useEffect(() => {
    ethereumClient();
  }, []);

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
      localStorage.setItem("isWalletConnected", true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object found!");
    }
  };

  const createPost = async (form) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        console.log("Going to pop wallet now to pay gas...");
        const tx = await contract.createPost(
          form.caption, // title
          form.url
        );
        await tx.wait();

        console.log("contract call success", tx);
      }
    } catch (error) {
      console.log("Create Post Failed", error);
    }
  };

  const getPosts = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const posts = await contract.getPost();
        const parsedPosts = posts.map((post, i) => ({
          owner: post.owner,
          title: post.caption,
          image: post.url,
          likes: post.likes,
          pId: i,
        }));

        console.log("contract call success");
        return parsedPosts;
      }
    } catch (error) {
      console.log("get post failed", error);
    }
  };

  const like = async (_id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        console.log("Going to pop wallet now to pay gas...");
        const tx = await contract.likePost(_id);
        await tx.wait();
        return tx;
        console.log("contract call success", tx);
      }
    } catch (error) {
      console.log("Like Post Failed", error);
    }
  };


  const logout = async () => {
    try {
      setCurrentAccount(null)
    } catch (error) {
      console.log("Error in logout", error)
    }
  }


  return (
    <AppContext.Provider
      value={{
        currentAccount,
        connectWallet,
        createPost,
        getPosts,
        like,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
