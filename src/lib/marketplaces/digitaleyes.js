import { NFTMarketplace } from "./marketplace.js";

const digitalEyes = new NFTMarketplace({
  name: "Digital Eyes",
  programId: ["A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"],
  favicon: "https://digitaleyes.market/apple-touch-icon.png",
  tokenBaseURL: "https://digitaleyes.market/item/"
});

export default digitalEyes;
