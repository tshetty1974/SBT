import React, { useState } from "react";
import initProvider from "../initProvider";
import UniversityDegreeV2ABI from "../UniversityDegreeV2.json";
import { ethers } from "ethers";
import "./styles.css";

const GetDegree = () => {
  const [tokenId, setTokenId] = useState(localStorage.getItem("tokenId") || "");
  const [degreeInfo, setDegreeInfo] = useState(null);

  const handleGetDegree = async () => {
    const provider = await initProvider();
    if (!provider) {
      console.error("Provider is not initialized");
      return;
    }
    const signer = await provider.getSigner();
    const contractAddress = "0xa9576AB179A8868a186aFcd7037d26aF0047140F"; // Replace with your contract address
    const contract = new ethers.Contract(contractAddress, UniversityDegreeV2ABI.abi, signer);
    try {
      const info = await contract.getDegree(tokenId);
      setDegreeInfo(info);
      console.log("Degree Info:", info);
    } catch (error) {
      console.error("Error fetching degree info:", error);
    }
  };

  return (
    <div className="container">
      <h2>Get Degree Information</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleGetDegree}>Get Degree</button>
      {degreeInfo && (
        <div className="degree-info">
          <h1>M.S. Ramaiah Institute of Technology</h1>
          <h3>This is an official confirmation that the following student has received a degree from our Institution.</h3>
          <p>Degree Awarded: {degreeInfo[0]}</p>
          <p>Student Name: {degreeInfo[1]}</p>
          <p>Deployed From: {degreeInfo[2]}</p>
          <p>Deployed To: {degreeInfo[3]}</p>
        </div>
      )}
    </div>
  );
};

export default GetDegree;