import { Address, decodeAbiParameters, encodeAbiParameters } from "viem";

// Define the parameter types for the function
const parameterTypes = [
  { name: "nftType", type: "uint256" },
  { name: "token", type: "address" },
  { name: "amount", type: "uint256" },
  { name: "count", type: "uint256" },
  { name: "index", type: "uint256" },
] as const;

// Function to decode EVM data
export function decodeEvmData(data: string) {
  // Remove function selector (first 4 bytes / 8 characters after 0x)
  const encodedData = "0x" + data.slice(10);

  // Decode the parameters
  const decodedData = decodeAbiParameters(
    parameterTypes,
    encodedData as Address
  );

  return {
    functionSelector: data.slice(0, 10),
    nftType: decodedData[0],
    token: decodedData[1].toLowerCase(), // Ensure consistent address casing
    amount: decodedData[2],
    count: decodedData[3],
    index: decodedData[4],
  };
}

// Function to generate EVM data
export function generateEvmData(amount: bigint, token: Address) {
  // Function selector for the specific function (bbb32c65)
  const functionSelector = "0xbbb32c65";

  // Encode the parameters
  const encodedParams = encodeAbiParameters(parameterTypes, [
    1n,
    token,
    amount,
    0n,
    3n,
  ]).slice(2); // Remove '0x' prefix from encoded params

  // Return the complete data
  return (
    functionSelector +
    encodedParams +
    "0000000000000000000000000000000000000000000000000000000000000000"
  );
}

// Example usage and validation:
const originalData =
  "0xbbb32c65000000000000000000000000000000000000000000000000000000000000000100000000000000000000000059470a5cd0d97bbf50fc32f476cbbed7c04074a300000000000000000000000000000000000000000000001b1ae4d6e2ef500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000";

// Decode the data
// const decoded = decodeEvmData(originalData);
// console.log("Decoded:", {
//   functionSelector: decoded.functionSelector,
//   nftType: decoded.nftType.toString(),
//   token: decoded.token,
//   amount: decoded.amount.toString(),
//   count: decoded.count.toString(),
//   index: decoded.index.toString(),
// });

// Generate data
// generateEvmData({
//   nftType: decoded.nftType,
//   token: decoded.token as `0x${string}`,
//   amount: decoded.amount,
//   count: decoded.count,
//   index: decoded.index,
// });

// console.log("Generated matches original:", generated === originalData);
// console.log("Original :", originalData);
// console.log("Generated:", generated);

// // If they don't match, show where they differ
// if (generated !== originalData) {
//   console.log("Length original:", originalData.length);
//   console.log("Length generated:", generated.length);

//   // Find first different character
//   for (let i = 0; i < originalData.length; i++) {
//     if (originalData[i] !== generated[i]) {
//       console.log(`First difference at position ${i}:`);
//       console.log(`Original: ${originalData.slice(i - 5, i + 5)}`);
//       console.log(`Generated: ${generated.slice(i - 5, i + 5)}`);
//       break;
//     }
//   }
// }

export function getRandomMultipleOfTen(min = 300, max = 600) {
  // Membuat min dan max menjadi kelipatan 10 terdekat
  const minRounded = Math.ceil(min / 10) * 10;
  const maxRounded = Math.floor(max / 10) * 10;

  // Menghasilkan angka random
  const random = Math.floor(
    Math.random() * ((maxRounded - minRounded) / 10 + 1)
  );

  // Mengkonversi ke kelipatan 10
  return minRounded + random * 10;
}
