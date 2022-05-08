import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { programs } from "@metaplex/js";
import axios from "axios";

export const getConnection = (cluster, commitment) => {
  return new Connection(clusterApiUrl(cluster), commitment);
};

export const mainnetConn = getConnection("mainnet-beta", "confirmed");

export const toPublicKey = addr => new PublicKey(addr);

export const shortenAddress = addr => `${addr.slice(0, 6)}...${addr.slice(-6)}`;

export const getAccountSignatures = async (conn, addr, option) => {
  return (await conn.getSignaturesForAddress(toPublicKey(addr), option)) || [];
};

export const getParsedTransaction = async (conn, signature) => {
  const txn = await conn.getParsedTransaction(signature);
  if (txn?.meta && txn?.meta?.err === null) return txn;
  return null;
};

export const getNFTMetadata = async (conn, mintAddr) => {
  const {
    metadata: { Metadata }
  } = programs;

  const metadataPDA = await Metadata.getPDA(mintAddr);
  const onChain = (await Metadata.load(conn, metadataPDA)).data;

  let offChain = {};
  if (onChain) offChain = await axios.get(onChain.data.uri).then(res => res.data);

  return {
    onChain,
    offChain
  };
};
