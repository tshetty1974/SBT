import React, { useState, useEffect } from "react";
import initProvider from "../initProvider";
import UniversityDegreeV2ABI from "../UniversityDegreeV2.json";
import { ethers } from "ethers";
import "./styles.css";

const IssuedDegrees = () => {
  const [issuedDegrees, setIssuedDegrees] = useState([]);

  useEffect(() => {
    const fetchIssuedDegrees = async () => {
      const provider = await initProvider();
      if (!provider) {
        console.error("Provider is not initialized");
        return;
      }

      const signer = await provider.getSigner();
      const contractAddress = "0xa9576AB179A8868a186aFcd7037d26aF0047140F"; // Replace with your contract address
      const contract = new ethers.Contract(contractAddress, UniversityDegreeV2ABI.abi, signer);

      try {
        const result = await contract.getIssuedDegrees();
        const tokenIds = result[0];
        const degrees = result[1];

        const degreesWithTokenIds = degrees.map((degree, index) => ({
          tokenId: tokenIds[index],
          courseName: degree[0],
          universityName: degree[1],
          deployedFrom: degree[2],
          deployedTo: degree[3],
        }));

        setIssuedDegrees(degreesWithTokenIds);
      } catch (error) {
        console.error("Error fetching issued degrees:", error);
      }
    };

    fetchIssuedDegrees();
  }, []);

  return (
    <div>
      <h2>Issued Degrees</h2>
      {issuedDegrees.length === 0 ? (
        <p>No degrees issued yet.</p>
      ) : (
        <ul>
          {issuedDegrees.map((degree) => (
            <li key={degree.tokenId}>
              
              <p>Course Name: {degree.courseName}</p>
              <p>University Name: {degree.universityName}</p>
              <p>Deployed From: {degree.deployedFrom}</p>
              <p>Deployed To: {degree.deployedTo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssuedDegrees;