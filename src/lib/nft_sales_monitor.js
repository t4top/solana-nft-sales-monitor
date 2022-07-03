import { processNFTTransaction } from "./marketplaces/index.js";
import {
  getAccountSignatures,
  getParsedTransaction,
  mainnetConn,
  toPublicKey
} from "./helper/solana.js";
import { sleep } from "./helper/sleep.js";
import { logToConsole } from "./helper/log.js";
import { postToDiscord } from "./discord.js";

// Minimum polling interval in ms between requests to Solana network
const POLLING_MIN_INTERVAL = 60000;

// Number of transactions within a single request
const REQUEST_TRANSACTIONS_COUNT = 5;

// Base URL to view a transaction details on Solana blockchain
const TRANSACTION_BASE_URL = "https://solscan.io/tx/";

export class NFTSalesMonitor {
  constructor({ name, creatorAddress, startAfterHash, discordWebhook }) {
    this.collectionName = name;
    this.creatorAddress = creatorAddress;
    this.startAfterHash = startAfterHash;
    this.discordWebhook = discordWebhook;
    this.isPaused = true;
  }

  async run() {
    let option = { limit: REQUEST_TRANSACTIONS_COUNT };
    const vm = this;

    if (vm.startAfterHash) option.until = vm.startAfterHash;

    while (!vm.isPaused) {
      try {
        const addrKey = toPublicKey(vm.creatorAddress);
        const signatures = await getAccountSignatures(mainnetConn, addrKey, option);

        // process in reverse to have the entries in chronological order
        for (let i = signatures.length - 1; i >= 0; i--) {
          const { signature } = signatures[i];
          const nftSale = await vm.parseSignature(signature);
          if (nftSale) await vm.publishNFTSale(nftSale);
          option.until = signature;
        }
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

  async parseSignature(signature) {
    let nftSale;
    const txn = await getParsedTransaction(mainnetConn, signature);

    if (txn) {
      const parsed = await processNFTTransaction(txn);
      parsed &&
        (nftSale = {
          date: new Date(txn.blockTime * 1000),
          collection: this.collectionName,
          signature,
          transactionURL: `${TRANSACTION_BASE_URL}${signature}`,
          ...parsed
        });
    }

    return nftSale;
  }

  async publishNFTSale(nftSale) {
    // log NFT sales
    logToConsole(nftSale);
    // publish to Discord
    await postToDiscord(this.discordWebhook, nftSale);
  }
}
