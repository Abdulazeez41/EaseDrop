import { ethers } from "hardhat";

async function main() {
  const easeTokenDrop = await ethers.getContractFactory("EaseTokenDrop");
  const easedrop = await easeTokenDrop.deploy("Testtoken", "TKT", 2000);

  await easedrop.deployed();

  console.log(`EaseTokenDrop deployed to ${easedrop.address}`);

  console.log(`-------------------------------------------------------`);

  const easeNFTDrop = await ethers.getContractFactory("EaseNFTDrop");
  const easeDrop = await easeNFTDrop.deploy("Testtoken", "TKT");

  await easeDrop.deployed();

  console.log(`EaseTokenDrop deployed to ${easeDrop.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
