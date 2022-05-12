import alphaArt from "./alphaart.js";
import digitalEyes from "./digitaleyes.js";
import exchangeArt from "./exchangeart.js";
import magicEden from "./magiceden.js";
import openSea from "./opensea.js";
import smb from "./smb.js";
import solanart from "./solanart.js";
import solport from "./solport.js";
import solsea from "./solsea.js";
import unknown from "./unknown.js";

const marketplaces = [
  alphaArt,
  digitalEyes,
  exchangeArt,
  magicEden,
  openSea,
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
