const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DegreeModule = buildModule("DegreeModule", (m) => {
  const token = m.contract("UniversityDegree");

  return { token };
});

module.exports = DegreeModule;