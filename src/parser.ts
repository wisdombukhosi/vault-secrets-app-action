import { SecretMapping } from './types';

export function parseSecrets(input: string): SecretMapping[] {
  return input
    .split(";")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [left, envVar] = line.split("|").map((p) => p.trim());
      return {
        hcpName: left.replace(/"/g, ""),
        envVar,
      };
    });
}
