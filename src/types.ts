export interface SecretMapping {
  hcpName: string;
  envVar?: string;
}

export interface HCPConfig {
  clientId: string;
  clientSecret: string;
  projectUrl: string;
  secrets: SecretMapping[];
}