// components/CountDegrees.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import UniversityDegreeV2 from "../UniversityDegreeV2.json";

const CountDegrees = () => {
  const [degreesCount, setDegreesCount] = useState(0);

  useEffect(() => {
    const fetchDegreesCount = async () => {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = UniversityDegreeV2.networks[networkId];
      const contract = new web3.eth.Contract(
        UniversityDegreeV2.abi,
        deployedNetwork && deployedNetwork.address
      );

      const count = await contract.methods.getIssuedDegreesCount().call();
      setDegreesCount(count);
    };

    fetchDegreesCount();
  }, []);

  return (
    <div>
      <h2>Issued Degrees Count</h2>
      <p>Total issued degrees: {degreesCount}</p>
    </div>
  );
};

export default CountDegrees;