const { expect } = require("chai");
const { ethers } = require('hardhat');

describe("Contract Test",  () => {
  let UniversityDegree, universityDegree;
  let UniversityDegree_contractFactory;
  let Degree_SmartContract;
  let addresses
  let owner
  let stu1, stu2, stu3
  let tokenId

  beforeEach(async () => {
      
    //Owner Address
    addresses = await ethers.getSigners();
    owner = addresses[0];
      
    //Student Addresses
    stu1 = addresses[1];
    stu2 = addresses[2];
    stu3 = addresses[3];
    tokenId = 1;

    // console.log("stu1:", stu1.address)
    // console.log("stu2:", stu2.address)
    // console.log("stu3:", stu3.address)

  })

  it("Gets Deployed on Chain", async () => {

    // Fetch Compiled Contract "UniversityDegree" using the Contract factory
    UniversityDegree_contractFactory = await ethers.getContractFactory('UniversityDegree');
    // Deploy smart contract for Degrees as ERC721 Tokens with Name and Symbol of University
    Degree_SmartContract = await UniversityDegree_contractFactory.deploy('University of XYZ', 'uXYZ')
    //console.log('Smart Contract Address :', Degree_SmartContract.target);
    //console.log('UniversityDegree deployed and ready for testing');
    
  });

  it("Mints Degrees for students", async ()=>{

        //Mint a new token
        tokenId = 1
        await Degree_SmartContract.connect(owner).mint(owner, stu1, tokenId, "Solidity", "University of XYZ");

        //fetch DegreeInfo at tokenID
        const degreeInfo = await Degree_SmartContract.getDegree(1);
    
        expect(degreeInfo.owner).to.be.equal(owner.address)
        expect(degreeInfo.to).to.be.equal(stu1.address)
        
        //Check current Degree Owner
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.equal(owner.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu1.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu2.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu3.address);

  })

  it("Remains unlocked until transferred from Owner to Student", async () => {
    tokenId = 1;
    expect(await Degree_SmartContract.isTokenLocked(tokenId)).to.be.equal(false);
    //is locked ?
  })

  it("Gets Transferred from Owner to Student", async()=>{
    //call ERC721 Transfer
    tokenId = 1;
    await Degree_SmartContract.connect(owner).transferFrom(owner,stu1,tokenId);
    //After transfer the Owner should not hold the Degree
    expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(owner.address);
    //After transfer the Stu1 should hold the Degree
    expect(await Degree_SmartContract.ownerOf(tokenId)).to.equal(stu1.address);
    //After transfer anyone else should not hold the Degree
    expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu2.address);
    expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu2.address);
  })

  it("Gets Locked after transferred and cannot be transferred by Student", async()=>{
    tokenId = 1;
    await expect(Degree_SmartContract.connect(stu1).transferFrom(stu1,stu2,tokenId)).to.be.revertedWith("Token is locked and cannot be transferred");
  })

  it("Gets Locked after transferred and cannot be transferred by Owner too", async()=>{
    tokenId = 1;
    await expect(Degree_SmartContract.connect(owner).transferFrom(stu1,stu2,tokenId)).to.be.revertedWith("Token is locked and cannot be transferred");
  })

  it("Is not transferable by any other third party", async()=>{
    tokenId = 1;
    await expect(Degree_SmartContract.connect(stu2).transferFrom(stu1,stu3,tokenId)).to.be.revertedWith("Token is locked and cannot be transferred");
    await expect(Degree_SmartContract.connect(stu3).transferFrom(stu1,stu2,tokenId)).to.be.revertedWith("Token is locked and cannot be transferred");
  })

    it("Mints Degrees for students", async ()=>{

        //Mint a new token
        tokenId = 2
        await Degree_SmartContract.connect(owner).mint(owner, stu2, tokenId, "Solidity", "University of XYZ");

        //fetch DegreeInfo at tokenID
        const degreeInfo = await Degree_SmartContract.getDegree(tokenId);
    
        //Check Degree info
        expect(degreeInfo.owner).to.be.equal(owner.address)

        //Check current Degree Owner
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.equal(owner.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu1.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu2.address);
        expect(await Degree_SmartContract.ownerOf(tokenId)).to.not.equal(stu3.address);

  })

  it("Does not re-write over any existing tokenIDs", async ()=>{

    //Mint a new token
    tokenId = 1
    await expect(Degree_SmartContract.connect(owner).mint(owner, stu3, tokenId, "Solidity", "University of XYZ")).to.be.revertedWith("Token ID already exists");

})
  
});
