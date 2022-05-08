import { NFTMarketplace } from "./marketplace.js";

const alphaArt = new NFTMarketplace({
  name: "Alpha Art",
  programId: ["HZaWndaNWHFDd9Dhk5pqUUtsmoBCqzb1MLu3NAh1VX6B"],
  favicon: "https://alpha.art/logo_512.png",
  tokenBaseURL: "https://alpha.art/t/"
});

export default alphaArt;
