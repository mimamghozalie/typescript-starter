import { ethers } from "ethers";
import { Address } from "viem";

export function showMultiPrivateKey(
  mnemonic: string,
  from: number,
  to: number
) {
  const address: Address[] = [];
  for (let index = from; index < to; index++) {
    const wallet = ethers.Wallet.fromMnemonic(
      mnemonic,
      `m/44'/60'/0'/0/${index}`
    );

    address.push(wallet.privateKey as Address);
  }

  return address;
}
