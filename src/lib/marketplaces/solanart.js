import { NFTMarketplace } from "./marketplace.js";

const solanart = new NFTMarketplace({
  name: "Solanart",
  programId: ["CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz"],
  favicon: "https://solanart.io/logo.png",
  tokenBaseURL: "https://solanart.io/nft/"
});

export default solanart;
