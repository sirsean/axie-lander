const fs = require('fs');
const os = require('os');
const path = require('path');
require("@nomiclabs/hardhat-waffle");

const configPath = path.join(os.homedir(), '.wallet');
if (!fs.existsSync(configPath)) {
    console.log('config file missing, please place it at:', configPath);
    process.exit();
}
const config = JSON.parse(fs.readFileSync(configPath));

const LAND = '0x8c811e3c958e190f5ec15fb376533a3398620500';
const LAND_STAKING = '0xb2a5110f163ec592f8f0d4207253d8cbc327d9fb';

function parseAbi(filename) {
    return JSON.parse(fs.readFileSync(filename).toString());
}

async function getContractAt(hre, abi, address) {
    return hre.ethers.getContractAt(abi, address, hre.ethers.provider.getSigner());
}

async function getLandContract(hre) {
    const abi = parseAbi('./abi/Land.json');
    return getContractAt(hre, abi, LAND);
}

async function getLandStakingContract(hre) {
    const abi = parseAbi('./abi/LandStaking.json');
    return getContractAt(hre, abi, LAND_STAKING);
}

function eqAddr(a, b) {
    return (a.toLowerCase() === b.toLowerCase());
}

task('plot-owner', 'Find out who owns a land plot, even if it is staked')
    .addParam('row', 'The row value of the plot')
    .addParam('col', 'The col value of the plot')
    .setAction(async ({ row, col }, hre) => {
        const landContract = await getLandContract(hre);
        const tokenId = await landContract.getTokenId(hre.ethers.BigNumber.from(row), hre.ethers.BigNumber.from(col));
        const landOwner = await landContract.ownerOf(tokenId);
        if (!eqAddr(landOwner, LAND_STAKING)) {
            console.log(landOwner);
        } else {
            const landStakingContract = await getLandStakingContract(hre);
            const stakedBy = await landStakingContract.stakedBy(tokenId);
            console.log(stakedBy);
        }
    });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    networks: {
        ronin: {
            url: config.ronin,
            accounts: [config.key],
        },
    },
    defaultNetwork: 'ronin',
};
