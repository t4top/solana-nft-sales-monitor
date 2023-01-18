import { NFTMarketplace } from "./marketplace.js";

const magicEden = new NFTMarketplace({
  name: "Magic Eden",
  programId: [
    "MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8",
    "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K", // v2
    "EA15T2W45BJFm71XmB5VGcsiWGKZTNfnK6aCmE2Hb5eC" // English Auction
  ],
  favicon: "https://cdn.shopify.com/s/files/1/0618/8384/2786/files/100x100.png",
  tokenBaseURL: "https://magiceden.io/item-details/"
});

export default magicEden;
