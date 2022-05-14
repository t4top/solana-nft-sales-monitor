# solana-nft-sales-monitor

Monitor sales of Solana NFT Collections and send corresponding notification to Discord.

## Configuration Parameters

The configuration file is `config.json`. It should be placed in the root folder of the repo. A sample [config.sample.json](config.sample.json) is provided as a reference.

Rename `config.sample.json` to `config.json` and update according to your needs.

The configuration is an array of settings. Multiple collections can be specified.

Below are the configuration parameters.

- **name**: The NFT collection name
- **creatorAddress**: The wallet address of one of the creators of the NFT collection. This program monitors this address for its transactions.
- **discordWebhook**: The Webhook URL to the Discord channel where NFT sales notification will be posted.

## Usage

Run below commands to install dependent packages and to start the monitoring loop. You can exit the program by pressing `CTRL + C` on the terminal window.

```bash
npm install
npm run dev
```

## Result

A sample Discord post is shown below. The embed content can be customized within [src/lib/discord.js](src/lib/discord.js).

![Sample Discord Post](sample_discord_post.png)
