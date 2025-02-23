import { Contract } from 'ethers';
import { formatUnits } from 'ethers';
import { BigNumberish } from 'ethers';

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

export async function getTokenSymbol(
  tokenAddress: string,
  provider: any
): Promise<string> {
  const contract = new Contract(tokenAddress, ERC20_ABI, provider);
  try {
    return await contract.symbol();
  } catch (error) {
    console.error('Error fetching token symbol:', error);
    return tokenAddress.slice(0, 6) + '...';
  }
}

export function formatTokenAmount(
  amount: BigNumberish,
  decimals: number
): string {
  return formatUnits(amount, decimals);
}