import React, { useState } from "react";
import initProvider from "../initProvider";
import UniversityDegreeV2ABI from "../UniversityDegreeV2.json";
import { ethers } from "ethers";
import "./styles.css";

const MintDegree = () => {
  const [courseName, setCourseName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleMint = async () => {
    const provider = await initProvider();
    if (!provider) {
      console.error("Provider is not initialized");
      return;
    }
    const signer = await provider.getSigner();
    const contractAddress = "0xa9576AB179A8868a186aFcd7037d26aF0047140F"; // Replace with your contract address
    const contract = new ethers.Contract(contractAddress, UniversityDegreeV2ABI.abi, signer);
    try {
      const tokenId = Date.now(); // Simple way to generate a unique tokenId
      await contract.mint(signer.getAddress(), recipient, tokenId, courseName, universityName);
      console.log("Degree minted successfully!");
      console.log("Token ID:", tokenId);
      
      // Store the token ID somewhere (e.g., localStorage, backend database)
      localStorage.setItem("tokenId", tokenId);
    } catch (error) {
      console.error("Error minting degree:", error);
    }
  };

  return (
    <div className="container">
      <h2>Mint New Degree</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Degree Awarded"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Student Name"
          value={universityName}
          onChange={(e) => setUniversityName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleMint}>Mint Degree</button>
    </div>
  );
};

export default MintDegree;