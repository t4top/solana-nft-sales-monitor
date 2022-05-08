# solana-nft-sales-monitor

Monitor sales of Solana NFT Collections.

## Configuration Parameters

The configuration file is `config.json`. It should be placed in the root folder of the repo. A sample `config.sample.json` is provided as a reference.

Rename `config.sample.json` to `config.json` and update according to your needs.

The configuration is an array of settings. Multiple collections can be specified.

Below are the configuration parameters.

- **name**: The NFT collection name
- **creatorAddress**: The wallet address of one of the creators of the NFT collection. This program monitors this address for its transactions.

## Usage

Run below command to start the monitoring loop. You can exit the program by pressing `CTRL + C` on the terminal window.

```bash
npm run dev
```
