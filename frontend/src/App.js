import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DegreeList from './components/DegreeList';
import DegreeForm from './components/DegreeForm';
import UniversityDegree from './artifacts/contracts/UniversityDegree.sol/UniversityDegree.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
        console.log(web3Instance)

      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContract = async () => {
      if (web3) {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = UniversityDegree.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          UniversityDegree.abi,
          deployedNetwork && deployedNetwork.address
          
        );
        setContract(contractInstance);
        console.log(contractInstance)
      }
    };

    initContract();
  }, [web3]);

  useEffect(() => {
    const getAccounts = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      }
    };

    getAccounts();
  }, [web3]);

  const handleMintDegree = async (degree) => {
    if (contract && accounts.length > 0) {
      try {
        await contract.methods
          .mint(accounts[0], degree.deployedTo, Date.now(), degree.courseName, degree.universityName)
          .send({ from: accounts[0] });
        // Fetch the updated list of degrees from the smart contract
        const updatedDegrees = await contract.methods.getDegrees().call();
        setDegrees(updatedDegrees);
      } catch (error) {
        console.error('Error minting degree:', error);
      }
    }
  };

  return (
    <div>
      <h1>University Degree DApp</h1>
      <DegreeForm onSubmit={handleMintDegree} />
      <DegreeList degrees={degrees} />
    </div>
  );
};

export default App;

