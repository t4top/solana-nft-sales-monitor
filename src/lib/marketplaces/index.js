import alphaArt from "./alphaart.js";
import auctionHouse from "./auctionhouse.js";
import coralCube from "./coralcube.js";
import digitalEyes from "./digitaleyes.js";
import exchangeArt from "./exchangeart.js";
import hyperspace from "./hyperspace.js";
import magicEden from "./magiceden.js";
import smb from "./smb.js";
import solanart from "./solanart.js";
import solport from "./solport.js";
import solsea from "./solsea.js";
import unknown from "./unknown.js";

const marketplaces = [
  alphaArt,
  auctionHouse,
  coralCube,
  digitalEyes,
  exchangeArt,
  hyperspace,
  magicEden,
  smb,
  solanart,
  solport,
  solsea
];

// unknown added as last entry to catch sales from marketplaces not listed above
marketplaces.push(unknown);

export const processNFTTransaction = async txn => {
  const marketplace = marketplaces.find(e => e.isMarketSale(txn));
  return marketplace.parseTxn(txn);
};
