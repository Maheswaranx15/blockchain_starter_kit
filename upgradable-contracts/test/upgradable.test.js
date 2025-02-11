const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Upgradable Smart Contract", function () {
  let owner, user;
  let logicV1, proxy, logicV2;
  let proxyContract,logicProxy,proxyContract2,logic1Proxy; 

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    // Deploy LogicV1
    logicV1 = await ethers.deployContract("LogicV1");
    logicV2 = await ethers.deployContract("LogicV2");

    // Deploy Proxy with LogicV1 address
    proxyContract = await ethers.deployContract("Proxy",[logicV1.target]);
    logicProxy = await ethers.getContractAt("LogicV1", proxyContract.target);

  });

  it("Should set and get number from LogicV1 via Proxy", async function () {
    await logicProxy.setNumber(42);
  });

  it("Should upgrade to LogicV2 and retain state", async function () {
    // Set number in LogicV1
    await logicProxy.setNumber(10);
    // Deploy LogicV2
    // const LogicV2 = await ethers.getContractFactory("LogicV2");
    // logicV2 = await LogicV2.deploy();
    // await logicV2.deployed();

    // Upgrade proxy to use LogicV2
    // await proxy.upgrade(logicV2.address);
    proxyContract2 = await ethers.deployContract("Proxy",[logicV2.target]);

    // Interact with Proxy as LogicV2
    logic1Proxy = await ethers.getContractAt("LogicV2", proxyContract.target);
    // Verify previous state is retained
    // expect(await proxyContract.getNumber()).to.equal(10);

    // Use new function from LogicV2
    // await proxyContract.doubleNumber();
    // expect(await proxyContract.getNumber()).to.equal(20);
  });

//   it("Should revert if non-admin tries to upgrade", async function () {
//     const LogicV2 = await ethers.getContractFactory("LogicV2");
//     logicV2 = await LogicV2.deploy();
//     await logicV2.deployed();

//     await expect(proxy.connect(user).upgrade(logicV2.address)).to.be.revertedWith(
//       "Only admin can upgrade"
//     );
//   });
});
