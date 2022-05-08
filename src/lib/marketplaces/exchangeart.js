import { NFTMarketplace } from "./marketplace.js";

const exchangeArt = new NFTMarketplace({
  name: "Exchange Art",
  programId: ["AmK5g2XcyptVLCFESBCJqoSfwV3znGoVYQnqEnaAZKWn"],
  favicon: "https://cdn.exchange.art/static/apple-meta-logo.png",
  tokenBaseURL: "https://exchange.art/single/"
});

export default exchangeArt;
