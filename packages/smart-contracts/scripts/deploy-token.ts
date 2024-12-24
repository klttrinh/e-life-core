import { ethers } from 'hardhat';

async function main() {
  const tokenFactory = await ethers.getContractFactory('Tokens');

  const token = await tokenFactory.deploy();

  await token.deployed();

  console.log(`deployed to ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
