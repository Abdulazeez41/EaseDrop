import { ethers } from "hardhat";
import {
  EaseTokenDrop,
  EaseTokenDrop__factory,
  EaseNFTDrop,
  EaseNFTDrop__factory,
} from "../typechain-types";

async function main() {
  const easeTokenDrop: EaseTokenDrop__factory =
    (await ethers.getContractFactory(
      "EaseTokenDrop"
    )) as EaseTokenDrop__factory;
  const easedrop: EaseTokenDrop = await easeTokenDrop.deploy(
    "Testtoken",
    "TKT",
    2000
  );

  await easedrop.deployed();

  console.log(`EaseTokenDrop deployed to ${easedrop.address}`);

  console.log(`-------------------------------------------------------`);

  const easeNFTDrop: EaseNFTDrop__factory = (await ethers.getContractFactory(
    "EaseNFTDrop"
  )) as EaseNFTDrop__factory;
  const easeDrop: EaseNFTDrop = await easeNFTDrop.deploy("Testtoken", "TKT");

  await easeDrop.deployed();

  console.log(`EaseNFTDrop deployed to ${easeDrop.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
