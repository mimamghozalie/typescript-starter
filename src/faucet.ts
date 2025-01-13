import {
  Address,
  Chain,
  HDAccount,
  PrivateKeyAccount,
  createWalletClient,
  erc20Abi,
  http,
  maxUint256,
  parseAbi,
  parseEther,
} from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, baseSepolia, bscTestnet } from "viem/chains";
import { AIRDROP_ACCOUNTS, delay } from "../../api";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "viem/actions";
import {
  PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS,
  PRIMEFI_BASE_SEPOLIA_ADDRESS,
  PRIMEFI_BSC_TESTNET_ADDRESS,
} from "./env";
import { generateEvmData, getRandomMultipleOfTen } from "./t2";

async function FaucetArbitrum(account: PrivateKeyAccount | HDAccount) {
  const chain: Chain = arbitrumSepolia;
  const depositAddress = PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DEPOSIT;
  await Faucet(chain, PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.PRFI, account);
  await Faucet(chain, PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DAI, account);
  await Faucet(chain, PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.USDC, account);
  await Faucet(chain, PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.USDT, account);
  await Faucet(chain, PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.WBTC, account);
  await DEPOSIT(
    chain,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DAI,
    depositAddress,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.PRFI,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.USDC,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.USDT,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.WBTC,
    PRIMEFI_ARBITRUM_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
}

async function FaucetBase(account: PrivateKeyAccount | HDAccount) {
  const chain: Chain = baseSepolia;
  const depositAddress = PRIMEFI_BASE_SEPOLIA_ADDRESS.DEPOSIT;
  await Faucet(chain, PRIMEFI_BASE_SEPOLIA_ADDRESS.PRFI, account);
  await Faucet(chain, PRIMEFI_BASE_SEPOLIA_ADDRESS.DAI, account);
  await Faucet(chain, PRIMEFI_BASE_SEPOLIA_ADDRESS.USDC, account);
  await Faucet(chain, PRIMEFI_BASE_SEPOLIA_ADDRESS.USDT, account);
  await Faucet(chain, PRIMEFI_BASE_SEPOLIA_ADDRESS.WBTC, account);
  await DEPOSIT(
    chain,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DAI,
    depositAddress,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.PRFI,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.USDC,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.USDT,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    chain,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.WBTC,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DEPOSIT,
    account
  );
}

async function FaucetBSC(account: PrivateKeyAccount | HDAccount) {
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.PRFI, account);
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.BUSD, account);
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.DAI, account);
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.USDC, account);
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.USDT, account);
  await Faucet(bscTestnet, PRIMEFI_BSC_TESTNET_ADDRESS.WBTC, account);
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.DAI,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.PRFI,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.BUSD,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.USDC,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.USDT,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
  await DEPOSIT(
    bscTestnet,
    PRIMEFI_BSC_TESTNET_ADDRESS.WBTC,
    PRIMEFI_BSC_TESTNET_ADDRESS.DEPOSIT,
    account
  );
}

export async function PrimeFiFaucet(pk: Address, index: number) {
  const account = privateKeyToAccount(pk);
  console.log(`=> [${index}] ${account.address}`);

  //   console.log(`=> Faucet arbitrum`);
  //   await FaucetArbitrum(account);

  console.log(`=> Faucet BASE`);
  await FaucetBase(account);
  await delay(3000);
  await Flik(
    baseSepolia,
    account,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DAI,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.DEBT,
    PRIMEFI_BASE_SEPOLIA_ADDRESS.FLIK
  );

  //   console.log(`=> Faucet BSC`);
  //   await FaucetBSC(account);
}

async function Faucet(
  chain: Chain,
  address: Address,
  account: PrivateKeyAccount | HDAccount
) {
  const client = createWalletClient({
    chain,
    transport: http(),
  });
  const symbol = await readContract(client, {
    address: address,
    abi: erc20Abi,
    functionName: "symbol",
  });
  try {
    const hash = await client.sendTransaction({
      to: address,
      account,
      data: "0xdde6f615",
    });

    const tx = await waitForTransactionReceipt(client, { hash });
    console.log(`=> Faucet ${symbol} ${tx.status}`);
  } catch (error: any) {
    console.error(`=> Faucet ${symbol} Error: ` + error.shortMessage);
  }
}

async function DEPOSIT(
  chain: Chain,
  asset: Address,
  depositAddress: Address,
  account: PrivateKeyAccount | HDAccount
) {
  const reff = 0;
  const client = createWalletClient({
    chain,
    transport: http(),
  });
  const symbol = await readContract(client, {
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
  });
  const balance = await readContract(client, {
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address],
  });
  if (balance == 0n) {
    console.log(`=> Balance 0 ${symbol}`);
    return;
  }
  const approveHash = await writeContract(client, {
    abi: erc20Abi,
    functionName: "approve",
    address: asset,
    args: [depositAddress, balance],
    account,
  });
  const txApprove = await waitForTransactionReceipt(client, {
    hash: approveHash,
  });
  console.log(`=> Approve ${symbol}: ${txApprove.status}`);
  const { request } = await simulateContract(client, {
    address: depositAddress,
    abi: parseAbi([
      "function deposit(address asset,uint256 amount,address onBehalfOf,uint16 referralCode)",
    ]),
    functionName: "deposit",
    args: [asset, balance, account.address, reff],
    account,
  });
  const hash = await writeContract(client, request);
  const tx = await waitForTransactionReceipt(client, { hash });
  console.log(`=> DEPOSIT ${symbol}: ${tx.status} `);
  if (tx.status == "reverted") {
    await DEPOSIT(chain, asset, depositAddress, account);
  }
}

export async function Flik(
  chain: Chain,
  account: PrivateKeyAccount,
  asset: Address,
  debt: Address,
  flik: Address
) {
  const client = createWalletClient({
    chain,
    transport: http(),
  });

  const symbol = await readContract(client, {
    abi: erc20Abi,
    functionName: "symbol",
    address: asset,
    account,
  });

  const approve1 = await writeContract(client, {
    abi: erc20Abi,
    functionName: "approve",
    address: asset,
    args: [flik, maxUint256],
    account,
  });
  const txApprove = await waitForTransactionReceipt(client, {
    hash: approve1,
  });
  console.log(`=> Approve ${symbol}: ${txApprove.status}`);

  const approve2 = await writeContract(client, {
    abi: parseAbi(["function approveDelegation(address arg0, uint256 arg1)"]),
    functionName: "approveDelegation",
    address: debt,
    args: [flik, maxUint256],
    account,
  });
  const txApprove2 = await waitForTransactionReceipt(client, {
    hash: approve2,
  });
  console.log(`=> Approve DEBT: ${txApprove2.status}`);

  const flikAmount = getRandomMultipleOfTen();
  const flikData = generateEvmData(parseEther(flikAmount.toString()), asset);
  const hash = await client.sendTransaction({
    to: flik,
    account,
    data: flikData as Address,
  });
  const tx = await waitForTransactionReceipt(client, { hash });
  console.log(`=> Flik ${symbol} ${flikAmount}: ${tx.status} `);
  if (tx.status == "reverted") {
    console.error(`=> Flik Error!!`);
    await Flik(chain, account, asset, debt, flik);
  }
}
