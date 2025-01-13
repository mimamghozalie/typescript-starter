import { PrimeFiFaucet, showMultiPrivateKey } from "./src";

// const pk = showPrivateKey(AIRDROP_ACCOUNTS.AIRDROP1, 0);
const MNEMONIC = process.env.MNEMONIC;
const START = process.env.START;
const END = process.env.END;
if (!MNEMONIC) {
  console.error(`=> MNEMONIC is required!`);
  process.exit(0);
}
const pks = showMultiPrivateKey(MNEMONIC, 35, 100);
// AIRDROP1 : 0-100

(async () => {
  for (let index = 0; index < pks.length; index++) {
    const pk = pks[index];
    await PrimeFiFaucet(pk, index);
  }
})();
