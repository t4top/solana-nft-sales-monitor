import { NFTMarketplace } from "./marketplace.js";

const hyperspace = new NFTMarketplace({
  name: "Hyperspace",
  programId: ["HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8"],
  favicon: "https://hyperspace.xyz/apple-touch-icon.png",
  tokenBaseURL: "https://hyperspace.xyz/token/"
});

export default hyperspace;
