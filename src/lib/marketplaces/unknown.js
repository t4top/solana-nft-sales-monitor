import { NFTMarketplace } from "./marketplace.js";

const unknown = new NFTMarketplace({
  name: "Unknown",
  programId: [],
  favicon: "https://solana.com/apple-touch-icon.png",
  tokenBaseURL: "https://solscan.io/token/"
});

unknown.isMarketSale = _ => true;

export default unknown;
