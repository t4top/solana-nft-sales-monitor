import { NFTMarketplace } from "./marketplace.js";

const smb = new NFTMarketplace({
  name: "Solana Monkey Business",
  programId: ["J7RagMKwSD5zJSbRQZU56ypHUtux8LRDkUpAPSKH4WPp"],
  favicon: "https://market.solanamonkey.business/apple-touch-icon.png",
  tokenBaseURL: "https://market.solanamonkey.business/item/"
});

export default smb;
