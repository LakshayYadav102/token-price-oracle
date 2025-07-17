function getAlchemyRpc(network) {
  const apiKey = process.env.ALCHEMY_API_KEY;

  if (network === 'polygon') {
    return `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`;
  } else if (network === 'ethereum') {
    return `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
  }

  throw new Error('Unsupported network');
}

module.exports = getAlchemyRpc;
