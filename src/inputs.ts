import * as core from '@actions/core';
import { parseSecrets } from './parser';
import { HCPConfig } from './types';

export function getConfig(): HCPConfig {
  const clientId = core.getInput('hcp_client_id', { required: true });
  const clientSecret = core.getInput('hcp_client_secret', { required: true });
  const projectUrl = core.getInput('project_url', { required: true });
  const secretsRaw = core.getInput('secrets', { required: true });

  return {
    clientId,
    clientSecret,
    projectUrl,
    secrets: parseSecrets(secretsRaw),
  };
}
