import { NFTMarketplace } from "./marketplace.js";

const hadeswap = new NFTMarketplace({
  name: "Hadeswap",
  programId: ["hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu"],
  favicon: "https://www.hadeswap.com/icons/icon-192x192.png",
  tokenBaseURL: "https://app.hadeswap.com/item/"
});

export default hadeswap;
