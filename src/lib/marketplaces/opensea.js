import { NFTMarketplace } from "./marketplace.js";

const openSea = new NFTMarketplace({
  name: "OpenSea",
  programId: ["hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"],
  favicon:
    "https://user-images.githubusercontent.com/35243/140804979-0ef11e0d-d527-43c1-93cb-0f48d1aec542.png",
  tokenBaseURL: "https://opensea.io/assets/solana/"
});

export default openSea;
