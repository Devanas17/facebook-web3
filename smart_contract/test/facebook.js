const { expect } = require("chai");
const hre = require("hardhat");

describe("Facebook", async function () {
  let owner, addr1, addr2;
  let facebook;
  const Facebook = await hre.ethers.getContractFactory("Facebook");
  facebook = await Facebook.deploy();
  await facebook.deployed();

  describe("Deployment", function () {
    it("should print hello", async () => {
      console.log("hello");
    });
  });
});
