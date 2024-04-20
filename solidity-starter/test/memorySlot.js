const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Lock", function () {


  describe("Deployment", function () {
    let hashinstance;
    it("Should fail if the unlockTime is not in the future", async function () {
      const ConfidentialHash = await ethers.getContractFactory("ConfidentialHash");
      hashinstance = await ConfidentialHash.deploy();
      await hashinstance.deployed();
      console.log("contract address",hashinstance.address)
    });

    it("slot storages",async function () {
      let firstUser = "ALICE"
      console.log("Slot 0",`{0x0} - String fit into 32 bytes`,firstUser)
      let alice_age = 24
      console.log("Slot 1",`{0x1} - uint/uint256 fit into 32 bytes`,alice_age)
      let ALICE_PRIVATE_KEY="0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"; 
      let ALICE_DATA = "QWxpY2UK";
      let aliceHash = ethers.utils.solidityKeccak256(['bytes32', 'string'], [ALICE_PRIVATE_KEY, ALICE_DATA]);

      console.log("Slot 2",`{0x2} - bytes32,256 bits`,ALICE_PRIVATE_KEY)
      console.log("Slot 3",`{0x3} - bytes32,256 bits`,ALICE_DATA)
      console.log("Slot 4",`{0x4} - bytes32,256 bits`,aliceHash)

      // let secondUser = "BOB"
      // console.log("Slot 5",`{0x0} - String fit into 32 bytes`,secondUser)
      // let bob_age = 21
      // console.log("Slot 6",`{0x1} - uint/uint256 fit into 32 bytes`,bob_age)
      // let BOB_PRIVATE_KEY="0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0"; 
      // let BOB_DATA = "QWxpY2UK";
      // let bobHash = ethers.utils.solidityKeccak256(['bytes32','string'],[BOB_PRIVATE_KEY, BOB_DATA]);
      // console.log("Slot 7",`{0x7} - bytes32,256 bits`,BOB_PRIVATE_KEY)
      // console.log("Slot 8",`{0x8} - bytes32,256 bits`,BOB_DATA)
      console.log("Slot 9",`{0x9} - bytes32,256 bits`,bobHash)

      const aliceHash_ = await ethers.provider.getStorageAt(hashinstance.address, ethers.utils.hexValue(4));

      const bobHash_ = await ethers.provider.getStorageAt(hashinstance.address, ethers.utils.hexValue(9));

      console.log(aliceHash_)
      console.log(bobHash_)
      const hash = ethers.utils.solidityKeccak256(['bytes32', 'bytes32'], [aliceHash_, bobHash_]);
      console.log(hash);
      let checkthehash = await hashinstance.checkthehash(hash)
      console.log(checkthehash)
      expect(await hashinstance.checkthehash(hash)).to.be.true;

    })
   

  });


});
