const solanaWeb3 = require("@solana/web3.js");

const searchAddress = "ALkXoJ7daxtcE7sauzg8NVpwKQ8q8aE7AdoyMzX9FTTY";

const endPoint ='https://crimson-thrumming-grass.solana-mainnet.quiknode.pro/ff7ae722ce0ac86c3fa1456a05bee9e97170f81d/'

const solanaConnection = new solanaWeb3.Connection(endPoint);

const getTransactions = async(address, numTx) => {
    const pubKey = new solanaWeb3.PublicKey(address);
    let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
    transactionList.forEach((transaction, i) => {
        const date = new Date(transaction.blockTime*1000);
        console.log(`Transaction No: ${i+1}`);
        console.log(`Signature: ${transaction.signature}`);
        console.log(`Time: ${date}`);
        console.log(`Status: ${transaction.confirmationStatus}`);
        console.log(("-").repeat(20));
    })
}

const getTransactions_logs = async() => {
  let transaction = await solanaConnection.onAccountChange(new solanaWeb3.PublicKey("9qAFHpSVmi2sKCYcJt9mvAzzfjCCbF1YczSirsh3BooT"),
    (updatedAccountInfo, context) => console.log("Updated account info: ", updatedAccountInfo),
    "confirmed"
  );
}

getTransactions_logs()
getTransactions(searchAddress,5)