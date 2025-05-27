import * as core from '@actions/core';
import { getConfig } from './inputs';
import { getAccessToken, fetchSecrets } from './vault';
import { HCPConfig } from './types';

async function main() {
  try {
    const config: HCPConfig = getConfig();

    const token = await getAccessToken(config.clientId, config.clientSecret);
    const allSecrets = await fetchSecrets(config.projectUrl, token);

    for (const mapping of config.secrets) {
      const value = allSecrets[mapping.hcpName];
      if (!value) {
        console.warn(`❌ Secret "${mapping.hcpName}" not found.`);
        continue;
      }

      console.log(`✅ Retrieved secret ${mapping.hcpName}: "***" [REDACTED]`);

      if (mapping.envVar) {
        core.exportVariable(mapping.envVar, value);
        console.log(`🔐 Exported secret ${mapping.hcpName} as $${mapping.envVar}`);
      }
    }
  } catch (error: any) {
    core.setFailed(`❌ Failed to fetch secrets: ${error.message}`);
    console.error(error);
  }
}

main().catch((error) => {
  core.setFailed(`💥 ${error.message}`);
  console.error(error);
});
