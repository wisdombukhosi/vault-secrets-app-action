import axios from 'axios';

export async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await axios.post(
    "https://auth.idp.hashicorp.com/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return res.data.access_token;
}

export async function fetchSecrets(projectUrl: string, token: string): Promise<Record<string, string>> {
  const res = await axios.get(`${projectUrl}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const secretsMap: Record<string, string> = {};
  for (const secret of res.data.secrets) {
    if (secret.static_version?.value) {
      secretsMap[secret.name] = secret.static_version.value;
    }
  }
  return secretsMap;
}
