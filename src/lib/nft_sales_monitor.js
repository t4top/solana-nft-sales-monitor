import { processNFTTransaction } from "./marketplaces/index.js";
import {
  getAccountSignatures,
  getParsedTransaction,
  mainnetConn,
  toPublicKey
} from "./helper/solana.js";
import { sleep } from "./helper/sleep.js";

// Minimum polling interval in ms between requests to Solana network
const POLLING_MIN_INTERVAL = 60000;

// Number of transactions within a single request
const REQUEST_TRANSACTIONS_COUNT = 5;

export class NFTSalesMonitor {
  constructor({ name, creatorAddress }) {
    this.collectionName = name;
    this.creatorAddress = creatorAddress;
    this.isPaused = true;
  }

  async run() {
    let option = { limit: REQUEST_TRANSACTIONS_COUNT };
    const vm = this;

    while (!vm.isPaused) {
      try {
        const addrKey = toPublicKey(vm.creatorAddress);
        const signatures = await getAccountSignatures(mainnetConn, addrKey, option);

        await signatures.reverse().forEach(async ({ signature }) => {
          const txn = await getParsedTransaction(mainnetConn, signature);

          if (txn) {
            const parsed = await processNFTTransaction(txn);
            const nftSale = {
              collection: vm.collectionName,
              date: new Date(txn.blockTime * 1000),
              signature,
              transactionURL: `https://solscan.io/tx/${signature}`,
              ...parsed
            };
            // log NFT sales
            console.log(nftSale);

            option.until = signature;
          }
        });
      } catch (e) {
        console.log("NFTSalesMonitor Error:", e, "\nCollection Name:", vm.collectionName);
      }

      await sleep(POLLING_MIN_INTERVAL);
    }
  }

  async resume() {
    this.isPaused = false;
    await this.run();
  }

  pause() {
    this.isPaused = true;
  }
}
