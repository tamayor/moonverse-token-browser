const { Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: "ciQSchOKLZL5-4DOGOsDvzi-K5N5H32a",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const getTokenBalances = async (address) => {
  const balances = await alchemy.core.getTokenBalances(address);

  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  const tokenBalancesData = await Promise.all(
    nonZeroBalances.map(async (token) => {
      let balance = token.tokenBalance;
      const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
      return {
        name: metadata.name,
        balance: `${balance}`,
        symbol: metadata.symbol,
        logo: metadata.logo,
      };
    })
  );

  return tokenBalancesData;
};


module.exports = { getTokenBalances };
