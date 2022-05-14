export const log = (...args) => console.log(...args);

export const logToConsole = salesData => {
  const { date, salesPrice, signature } = salesData;
  const { name: exchangeName } = salesData.exchange;
  const { name: nftName } = salesData.metadata.offChain;

  log(`${date.toLocaleString()}, ${nftName}, ${salesPrice} SOL, ${exchangeName}, ${signature}`);
};
