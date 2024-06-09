const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DegreeModule = buildModule("DegreeModule", (m) => {
  const token = m.contract("UniversityDegree",["DegreeToken", "DGT"]);

  return { token };
});

module.exports = DegreeModule;