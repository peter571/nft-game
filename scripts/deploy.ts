import hre from "hardhat";

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Kimmi", "Auba", "Zhiang"], // Names
    [
      "https://i.imgur.com/9kPIAlp.png", // Images
      "https://i.imgur.com/npeAtBX.png",
      "https://i.imgur.com/jZ86onQ.png",
    ],
    [100, 200, 300], // HP values
    [100, 50, 25], // Attack damage values
    "Rex", // Boss name
    "https://i.imgur.com/bNRbw8n.png", // Boss image
    10000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
