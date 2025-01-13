import { arbitrumSepolia, baseSepolia } from "viem/chains";
import {
  AIRDROP_ACCOUNTS,
  SEND_BATCH_CONTRACT,
  sendBatchETH,
  showMultiAddress,
  showPrivateKey,
} from "../../api";
import { deployContractBatchTransfer } from "../../api/contract/util/batchTransfer";

const pk = showPrivateKey(AIRDROP_ACCOUNTS.IMAM, 0);
const START = 200;
const END = 300;
const dest = showMultiAddress(AIRDROP_ACCOUNTS.AIRDROP1, START, END);
// sendBatchETH(
//   arbitrumSepolia,
//   SEND_BATCH_CONTRACT.ArbitrumSepolia,
//   pk,
//   dest,
//   "0.005"
// );

// deployContractBatchTransfer(pk, baseSepolia);
sendBatchETH(baseSepolia, SEND_BATCH_CONTRACT.baseSepolia, pk, dest, "0.005");
