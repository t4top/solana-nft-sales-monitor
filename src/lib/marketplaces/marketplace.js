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
    let [mint, buyer] = this.findTokenMintAndBuyer(txn);
    // return if the transaction is not an NFT sale
    if (!mint) return;

    // if buyer is not found, use the signer instead
    buyer = buyer || this.findSigner(txn) || "";

    const seller = this.findSeller(txn);

    // return if buyer & seller are the same (i.e NFT delist)
    if (buyer === seller) return;

    const salesPrice = this.calculateSalesPrice(txn, buyer);

    // return if sales price can't be correctly calculated
    if (salesPrice <= 0) return;

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

  findTokenMintAndBuyer(txn) {
    const { preTokenBalances, postTokenBalances } = txn.meta;

    let balances = [];
    if (postTokenBalances?.length) balances = postTokenBalances;
    else balances = preTokenBalances;

    // a NFT token has a decimal of 0 and an amount of 1
    const token = balances?.find(
      el => el.uiTokenAmount.decimals === 0 && el.uiTokenAmount.uiAmount === 1
    );

    // the buyer receives the NFT after the transaction
    let buyer = undefined;
    if (postTokenBalances?.length) buyer = token?.owner;

    return [token?.mint, buyer];
  }

  // the first signer can be assummed to be the buyer
  findSigner(txn) {
    const { accountKeys } = txn.transaction.message;
    const signer = accountKeys?.find(acct => acct.signer);
    return signer?.pubkey?.toBase58();
  }

  // the seller gets the highest SOL payout
  findSeller(txn) {
    const { preBalances, postBalances } = txn.meta;
    const { accountKeys } = txn.transaction.message;
    let diff = 0;
    let maxDiff = 0;
    let maxIndex = 0;

    for (let i = 0; i < postBalances.length; i++) {
      diff = postBalances[i] - preBalances[i];
      if (diff > maxDiff) {
        maxIndex = i;
        maxDiff = diff;
      }
    }

    return accountKeys[maxIndex].pubkey?.toBase58();
  }

  // Each marketplace process price differently in the smart contract depending on the type of sales
  // like regular sales, bid sale, accept offer, auction, etc.
  calculateSalesPrice(txn, buyer) {
    const salesPrice =
      this.priceFromInnerInstructions(txn, buyer) ||
      this.priceFromMsgInstructions(txn, buyer) ||
      this.priceFromBalances(txn, buyer);

    return salesPrice / LAMPORTS_PER_SOL;
  }

  // calculate price from InnerInstructions. This works for regular sales in most markeplaces.
  priceFromInnerInstructions(txn, buyer) {
    const { innerInstructions } = txn.meta;
    let listPrice = 0;
    let bidPrice = 0;

    innerInstructions.forEach(el => {
      el.instructions.forEach(ins => {
        if (ins.parsed?.type === "transfer") {
          const { lamports, source } = ins.parsed.info;
          if (source === buyer) listPrice += lamports || 0;
          if (source !== buyer) bidPrice += lamports || 0;
        }
      });
    });

    return listPrice || bidPrice;
  }

  // calculate price from message instructions. This works for transactions done in Wrapped SOL.
  priceFromMsgInstructions(txn, buyer) {
    const { instructions } = txn.transaction.message;
    let listPrice = 0;
    let bidPrice = 0;

    instructions.forEach(ins => {
      if (ins.parsed?.type === "transfer") {
        const { lamports, source } = ins.parsed.info;
        if (source === buyer) listPrice += lamports || 0;
        if (source !== buyer) bidPrice += lamports || 0;
      }
    });

    return listPrice || bidPrice;
  }

  // calculate price from balances of the buyer. This works if other methods fail.
  // Trasaction fees are included in sales price.
  priceFromBalances(txn, buyer) {
    const { preBalances, postBalances } = txn.meta;
    const { accountKeys } = txn.transaction.message;
    const buyerIndex = accountKeys.findIndex(accnt => accnt.pubkey?.toBase58() === buyer);

    return preBalances[buyerIndex] - postBalances[buyerIndex];
  }
}
