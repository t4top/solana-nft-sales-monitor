import axios from "axios";
import { shortenAddress } from "./helper/solana.js";

export const postToDiscord = async (discordWebhook, salesData) => {
  const { date, collection, mint, buyer, seller, salesPrice, signature, transactionURL } =
    salesData;
  const { name: exchangeName, favicon } = salesData.exchange;
  const { name: nftName, image } = salesData.metadata.offChain;

  const payload = {
    embeds: [
      {
        author: {
          name: `${collection} Collection`
        },
        title: `${nftName} → SOLD`,
        url: transactionURL,
        timestamp: date,
        fields: [
          {
            name: "Price",
            value: `${salesPrice} S◎L`
          },
          {
            name: "Seller",
            value: shortenAddress(seller),
            inline: true
          },
          {
            name: "Buyer",
            value: shortenAddress(buyer),
            inline: true
          },
          {
            name: "Mint Token",
            value: mint,
            inline: true
          },
          {
            name: "Transaction ID",
            value: signature
          }
        ],
        thumbnail: {
          url: image
        },
        footer: {
          text: exchangeName,
          icon_url: favicon
        }
      }
    ]
  };

  return axios
    .post(discordWebhook, payload)
    .catch(e => console.log("postToDiscord Error:", e, "\nSignature:", signature));
};
