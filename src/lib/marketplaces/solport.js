import { NFTMarketplace } from "./marketplace.js";

const solport = new NFTMarketplace({
  name: "Solport",
  programId: ["SPf5WqNywtPrRXSU5enq5z9bPPhREaSYf2LhN5fUxcj"],
  favicon: "https://solport.io/favicon.ico",
  tokenBaseURL: "https://solport.io/nft/"
});

export default solport;
