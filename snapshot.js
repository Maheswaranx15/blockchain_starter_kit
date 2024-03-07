const fs = require('fs');
const ethers = require("ethers");
const config = require('../../NFTdata.json')
const dotenv = require("dotenv");
dotenv.config();
const TOKEN_ADDRESS = config.address;
const STARTING_TOKEN_ID = 0;
const HIGHEST_TOKEN_ID = 99; 
const PROVIDER_ENDPOINT = process.env.ETH_HTTPS; 
const CHAIN_ID = 11155111;
const FORMAT = "ownerByTokenId"; // options: "tokensByOwner" or "ownerByTokenId"

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_ENDPOINT, CHAIN_ID);
const abi = ["function ownerOf (uint256) view returns (address)"];
const contract = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

async function ownerByTokenId() {
    const data = { Token_ID: '', Address: '' };

    for (let i = STARTING_TOKEN_ID; i <= HIGHEST_TOKEN_ID; i++) {
        try {
            if (i % 100 == 0) console.log(`Checkpoint: ${i}`);
            const owner = await contract.ownerOf(i);
            data[i] = { Token_ID: i, Address: owner };
            
        } catch (err) {
            console.log(`Token ${i} Error:`);
            console.log(err);
            data[i] = 'ERROR';
        }
    }

    fs.writeFileSync('ownerByTokenId.json', JSON.stringify(data, null, 2));
}


async function tokensByOwner() {
    const data = {};

    for (let i = 1; i <= HIGHEST_TOKEN_ID; i++) {
        try {
            if (i % 100 == 0) console.log(`Checkpoint: ${i}`)
            const owner = await contract.ownerOf(i);
            if (data[owner]) {
                data[owner].count++;
                data[owner].ids.push(i);
            } else {
                data[owner] = { count: 1, ids: [i] };
            }
        } catch (err) {
            if (data['Errors']) {
                data['Errors'].push(i);
            } else {
                data['Errors'] = [i];
            }
            console.log(`Token ${i} Error:`);
            console.log(err);
        }
    }

    fs.writeFileSync('tokensByOwner.json', JSON.stringify(data, null, 2));
}

async function main(format = "tokensByOwner") {
    const timeBefore = new Date().getTime();
    if (format == "tokensByOwner") {
        await tokensByOwner()
    } else if (format == "ownerByTokenId") {
        await ownerByTokenId()
    } else {
        console.log("Invalid format. Please use 'tokensByOwner' or 'ownerByToken'.")
    }
    
    const timeAfter = new Date().getTime();
    const timeTaken = (timeAfter - timeBefore) / 1000;
    console.log(`Script Completed. Total Run Time: ${timeTaken} Seconds`)
}

main(FORMAT)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
