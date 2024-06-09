// App.js
import React, { useState } from "react";
import MintDegree from "./components/MintDegree";
import GetDegree from "./components/GetDegree";
import CountDegrees from "./components/CountDegrees";
import IssuedDegrees from "./components/IssuedDegrees";
import "./components/styles.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("mint");

  return (
    <div className="app">
      <h1 className="app-title">MSRIT Degree Dapp</h1>
      <nav className="nav">
        <button
          className={`nav-btn ${currentPage === "mint" ? "active" : ""}`}
          onClick={() => setCurrentPage("mint")}
        >
          Mint Degree
        </button>
        <button
          className={`nav-btn ${currentPage === "get" ? "active" : ""}`}
          onClick={() => setCurrentPage("get")}
        >
          Get Degree
        </button>
        <button
          className={`nav-btn ${currentPage === "count" ? "active" : ""}`}
          onClick={() => setCurrentPage("count")}
        >
          Count Degrees
        </button>
        <button
          className={`nav-btn ${currentPage === "issued" ? "active" : ""}`}
          onClick={() => setCurrentPage("issued")}
        >
          Issued Degrees
        </button>
      </nav>
      <div className="container">
        {currentPage === "mint" ? (
          <MintDegree />
        ) : currentPage === "get" ? (
          <GetDegree />
        ) : currentPage === "count" ? (
          <CountDegrees />
        ) : (
          <IssuedDegrees />
        )}
      </div>
    </div>
  );
};

export default App;