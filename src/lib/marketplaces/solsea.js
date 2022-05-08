import { NFTMarketplace } from "./marketplace.js";

const solsea = new NFTMarketplace({
  name: "Solsea",
  programId: ["617jbWo616ggkDxvW1Le8pV38XLbVSyWY8ae6QUmGBAU"],
  favicon: "https://solsea.io/logo_solo.png",
  tokenBaseURL: "https://solsea.io/nft/"
});

export default solsea;
