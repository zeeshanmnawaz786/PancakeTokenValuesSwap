const ethers = require("ethers");
const {
  factoryAddress,
  routerAddress,
  fromAddress,
  toAddress,
} = require("./addressList");
const { erc20ABI, factoryABI, pairABI, routerABI } = require("./abi");

const provider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.bnbchain.org"
);
const factoryInstance = new ethers.Contract(
  factoryAddress,
  factoryABI,
  provider
);
const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);

const priceFetch = async (humanInput) => {
  const token1Instance = new ethers.Contract(fromAddress, erc20ABI, provider);
  const decimal1 = await token1Instance.decimals();
  const token2Instance = new ethers.Contract(toAddress, erc20ABI, provider);
  const decimal2 = await token2Instance.decimals();

  const amountIn = ethers.parseUnits(humanInput, decimal1).toString();

  const amountOut = await routerInstance.getAmountsOut(amountIn, [
    fromAddress,
    toAddress,
  ]);

  const humanOutput = ethers.formatUnits(amountOut[1], decimal2).toString();
  console.log(
    "🚀 ~ file: priceFetch.js:34 ~ priceFetch ~ humanOutput:",
    humanOutput
  );
};
priceFetch("100");
