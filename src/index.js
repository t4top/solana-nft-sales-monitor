import { readFileSync, existsSync } from "fs";
import { NFTSalesMonitor } from "./lib/nft_sales_monitor.js";
import { randomSleep } from "./lib/helper/sleep.js";

const CONFIG_FILE = "config.json";

const readConfig = () =>
  existsSync(CONFIG_FILE) ? JSON.parse(readFileSync(CONFIG_FILE, "utf-8")) : [];

const runNFTSalesMonitor = async () => {
  const collections = readConfig();

  if (!(collections && collections.length))
    return console.log(`No collection found. Make sure ${CONFIG_FILE} is properly configured.`);

  for (let i = 0; i < collections.length; i++) {
    const monitor = new NFTSalesMonitor(collections[i]);
    monitor.resume();
    // insert 10s to 60s random delay between requests not to spam Solana RPC
    await randomSleep(10000, 60000);
  }
};

const main = () => {
  runNFTSalesMonitor();
};

main();
