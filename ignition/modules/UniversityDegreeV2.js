const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DegreeModuleV2 = buildModule("DegreeModuleV2", (m) => {
  const token = m.contract("UniversityDegreeV2", ["DegreeToken", "DGT"]);
  return { token };
});

module.exports = DegreeModuleV2;