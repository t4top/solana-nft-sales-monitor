import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mainnetConn, getNFTMetadata } from "../helper/solana.js";

export class NFTMarketplace {
  constructor({ name, programId, favicon, tokenBaseURL }) {
    this.name = name;
    this.favicon = favicon;
    this.tokenBaseURL = tokenBaseURL;
    this.programId = programId;
  }

  isMarketSale(txn) {
    const vm = this;
    const { logMessages } = txn.meta;
    return logMessages.some(log => vm.programId.some(id => log.includes(id)));
  }

  getItemURL(token) {
    return `${this.tokenBaseURL}${token}`;
  }

  async parseTxn(txn) {
    const buyer = this.findBuyer(txn);
    const [seller, salesPrice] = this.findSellerAndSalesPrice(txn, buyer);
    const mint = this.getTokenMint(txn);
    const metadata = await getNFTMetadata(mainnetConn, mint);
    const mintUrl = this.getItemURL(mint);

    return {
      mint,
      buyer,
      seller,
      salesPrice,
      exchange: {
        name: this.name,
        favicon: this.favicon,
        mintUrl
      },
      metadata
    };
  }

  // the buyer is the signer of the transaction
  findBuyer(txn) {
    const { accountKeys } = txn.transaction.message;
    const signer = accountKeys.find(acct => acct.signer);
    return signer ? signer.pubkey.toBase58() : "";
  }

  // the assumption is,
  // the seller gets the highest SOL payout but not more than the sale price
  findSellerAndSalesPrice(txn, buyer) {
    let salesPrice = 0;
    let seller = "";
    let sellerPay = 0;
    let transfers = [];

    const { innerInstructions } = txn.meta;

    innerInstructions.forEach(el => {
      el.instructions.forEach(ins => {
        if (ins.parsed && ins.parsed.type === "transfer") {
          const { destination, lamports, source } = ins.parsed.info;
          if (source === buyer) salesPrice += lamports;
          transfers.push({ destination, lamports });
        }
      });
    });

    transfers.forEach(({ destination, lamports }) => {
      if (salesPrice > lamports && lamports > sellerPay) {
        sellerPay = lamports;
        seller = destination;
      }
    });

    return [seller, salesPrice / LAMPORTS_PER_SOL];
  }

  getTokenMint(txn) {
    const { preTokenBalances, postTokenBalances } = txn.meta;

    if (postTokenBalances && postTokenBalances.length) return postTokenBalances[0].mint;
    if (preTokenBalances && preTokenBalances.length) return preTokenBalances[0].mint;
  }
}
