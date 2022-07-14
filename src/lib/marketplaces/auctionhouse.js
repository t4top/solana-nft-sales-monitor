import { NFTMarketplace } from "./marketplace.js";

const auctionHouse = new NFTMarketplace({
  name: "Auction House",
  programId: ["hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"],
  favicon:
    "https://assets.website-files.com/6182ee30b608385a15466a3f/6184384282f40c4678a749cd_iphone%20icon.png",
  tokenBaseURL: "https://solscan.io/token/"
});

export default auctionHouse;
