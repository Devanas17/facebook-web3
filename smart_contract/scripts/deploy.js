const hre = require("hardhat");

async function main() {
  const Facebook = await hre.ethers.getContractFactory("Facebook");
  const facebook = await Facebook.deploy();
  await facebook.deployed();

  console.log(` deployed to ${facebook.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
