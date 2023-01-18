import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NFTMarketplace } from "./marketplace.js";

// Coral Cube fixed fee on each sale
const CORALCUBE_FEE = 0.00091176 * LAMPORTS_PER_SOL;

class CoralCubeMarket extends NFTMarketplace {
  // Coral Cube has a fixed fee on every sale. Remove the fee
  calculateSalesPrice(txn, buyer) {
    const priceWithFee = super.calculateSalesPrice(txn, buyer);
    return priceWithFee - CORALCUBE_FEE;
  }
}

const coralCube = new CoralCubeMarket({
  name: "Coral Cube",
  programId: ["6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL"],
  favicon: "https://coralcube.io/apple-touch-icon.png",
  tokenBaseURL: "https://coralcube.io/detail/"
});

export default coralCube;
