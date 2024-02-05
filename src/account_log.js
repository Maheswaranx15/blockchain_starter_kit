const { Connection, Transaction, clusterApiUrl } = require('@solana/web3.js');
const connection = new Connection(clusterApiUrl('devnet'));
const {Keypair} = require('@solana/web3.js');
// const keypair = Keypair.generate();

// console.log('Public key:', keypair.publicKey.toBase58());
// console.log('Private key:', keypair.secretKey.toString());

const walletAddress = 'F9qSr5enJPxuAqhdtQnYwAWByfEBAJRBP1w2PM1N3VK5';

// Initialize a variable to store the last seen transaction signature
let lastTransactionSignature;

// Function to fetch and process new transactions
const fetchAndProcessTransactions = async () => {
  const signatureStatus = await connection.getSignatureStatuses([
    ...Array.from({ length: 100 }, (_, index) =>
      lastTransactionSignature
        ? lastTransactionSignature - index - 1
        : undefined
    ),
  ]);
  signatureStatus.forEach((result, index) => {
    if (!result) return;
    console.log(`Transaction found: ${result.slot}`);
    // Further processing can be done with the transaction details
  });

  // Set the last seen transaction signature for the next iteration
  lastTransactionSignature = await connection.getRecentBlockhash().then(
    ([blockhash, feeCalculator]) =>
      connection
        .getNewBlockhash(blockhash)
        .then(({ blockhash }) =>
          connection
            .getMinimumBalanceForRentExemption(Transaction.encodedLength)
            .then((minBalance) =>
              new Transaction({ recentBlockhash: blockhash }).add(
                TransactionInstruction.new({})
              )
            )
        )
        .then((transaction) =>
          connection.sendTransaction(transaction, [246,194,67,226,254,183,234,99,113,19,161,220,177,250,245,212,34,19,187,125,43,176,225,207,82,87,192,120,215,149,49,8,210,71,10,132,116,28,12,1,129,41,137,140,12,28,88,214,56,159,86,140,74,7,41,80,98,181,201,1,63,51,107,168])
        )
    
  );
};

setInterval(fetchAndProcessTransactions, 5000);


