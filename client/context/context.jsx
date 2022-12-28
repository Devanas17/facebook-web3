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
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);

        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request({ method: "eth_accounts" });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "5") {
        alert("Please connect to Goerli!");
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    checkIfWalletIsConnected()
    checkNetwork()
  }, [])

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
