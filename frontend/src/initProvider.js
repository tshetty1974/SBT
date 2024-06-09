import { ethers } from "ethers";

async function initProvider() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      return provider;
    } catch (error) {
      console.error("User denied account access or something went wrong!");
    }
  } else {
    console.error("No Ethereum provider found. Install MetaMask.");
  }
  return null;
}

export default initProvider;