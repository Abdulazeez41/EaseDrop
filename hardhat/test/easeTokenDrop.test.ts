import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { EaseTokenDrop } from "../typechain-types";

describe("EaseTokenDrop", function () {
  let owner: Signer,
    recipient1: Signer,
    recipient2: Signer,
    easeTokenDrop: EaseTokenDrop;

  beforeEach(async function () {
    [owner, recipient1, recipient2] = await ethers.getSigners();

    const EaseTokenDrop = await ethers.getContractFactory("EaseTokenDrop");
    easeTokenDrop = (await EaseTokenDrop.deploy(
      "EaseToken",
      "EASE",
      1000000
    )) as EaseTokenDrop;
    await easeTokenDrop.deployed();
  });

  it("Should deploy the contract with the correct initial state", async function () {
    const totalSupply = await easeTokenDrop.totalSupply();
    expect(totalSupply).to.equal(1000000 * 10 ** 18);

    const ownerBalance = await easeTokenDrop.balanceOf(
      await owner.getAddress()
    );
    expect(ownerBalance).to.equal(1000000 * 10 ** 18);
  });

  it("Should airdrop tokens to a list of addresses", async function () {
    await easeTokenDrop
      .connect(owner)
      .doAirDrop(
        [await recipient1.getAddress(), await recipient2.getAddress()],
        1000
      );

    const recipient1Balance = await easeTokenDrop.balanceOf(
      await recipient1.getAddress()
    );
    expect(recipient1Balance).to.equal(1000);

    const recipient2Balance = await easeTokenDrop.balanceOf(
      await recipient2.getAddress()
    );
    expect(recipient2Balance).to.equal(1000);
  });

  it("Should airdrop tokens with individual amounts to a list of addresses", async function () {
    await easeTokenDrop
      .connect(owner)
      .sendBatch(
        [await recipient1.getAddress(), await recipient2.getAddress()],
        [500, 700]
      );

    const recipient1Balance = await easeTokenDrop.balanceOf(
      await recipient1.getAddress()
    );
    expect(recipient1Balance).to.equal(500);

    const recipient2Balance = await easeTokenDrop.balanceOf(
      await recipient2.getAddress()
    );
    expect(recipient2Balance).to.equal(700);
  });

  it("Should transfer ETH balance to the owner", async function () {
    const initialOwnerBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );

    await (
      await owner.sendTransaction({
        to: easeTokenDrop.address,
        value: ethers.utils.parseEther("1.0"),
      })
    ).wait();

    await easeTokenDrop.connect(owner).transferEthToOnwer();

    const finalOwnerBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    expect(finalOwnerBalance.gt(initialOwnerBalance)).to.be.true;
  });

  it("Should self-destruct the contract and transfer remaining funds to the owner", async function () {
    const initialOwnerBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );

    await (
      await owner.sendTransaction({
        to: easeTokenDrop.address,
        value: ethers.utils.parseEther("1.0"),
      })
    ).wait();

    await easeTokenDrop.connect(owner).kill();

    const finalOwnerBalance = await ethers.provider.getBalance(
      await owner.getAddress()
    );
    expect(finalOwnerBalance.gt(initialOwnerBalance)).to.be.true;

    // Attempting to interact with the contract after self-destruct should throw an error
    await expect(easeTokenDrop.totalSupply()).to.be.revertedWith(
      "Returned values aren't valid, did it run Out of Gas?"
    );
  });
});
