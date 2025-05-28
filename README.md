# 🔐 vault-secrets-app-action

**Fetch secrets from HashiCorp Vault Secrets App into your GitHub Actions workflows.**

This GitHub Action retrieves and maps static secrets from a HashiCorp Cloud Platform (HCP) Vault Secrets App using `HCP_CLIENT_ID`, `HCP_CLIENT_SECRET`, and your app's `HCP_PROJECT_URL`. It is designed to be a secure, read-only utility for loading secrets into your CI/CD environment.

---

## ✨ Features

- ✅ Connects to HCP Vault Secrets App via OAuth2
- 🔒 Fetches secrets securely with no value exposure in logs
- 📦 Maps secrets to GitHub Action environment variables
- 🔁 Supports multiple secrets in a flexible input format
- 🔍 Designed for read-only access

---

## 📥 Inputs

| Name                | Description                                                                                                                                     | Required |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `HCP_CLIENT_ID`     | HCP service principal client ID                                                                                                                 | ✅ Yes   |
| `HCP_CLIENT_SECRET` | HCP service principal client secret                                                                                                             | ✅ Yes   |
| `HCP_PROJECT_URL`       | Full URL to your Vault Secrets App (e.g. `https://api.cloud.hashicorp.com/secrets/v1beta1/projects/PROJECT_ID/secrets`)                         | ✅ Yes   |
| `HCP_SECRETS`           | Mapping of secrets to use, in the format: `hcpSecretName \| ENV_VAR;` (e.g. `my-db-password \| DB_PASSWORD; another-secret \| OTHER_ENV;`)      | ✅ Yes   |

---

## 🧪 Example Usage

```yaml
jobs:
  fetch-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Fetch secrets from Vault Secrets App
        uses: wisdombukhosi/vault-secrets-app-action@v1
        with:
          hcp_client_id: ${{ secrets.HCP_CLIENT_ID }}
          hcp_client_secret: ${{ secrets.HCP_CLIENT_SECRET }}
          hcp_project_url: ${{ secrets.HCP_PROJECT_URL }}
          hcp_secrets: |
            digitalocean_api_token | DO_API_TOKEN;
            terraform_token_vpc | TF_VPC_TOKEN;
````

This will:

* Fetch the secrets by name from the Vault Secrets App
* Export them as `DO_API_TOKEN`, `TF_VPC_TOKEN` environment variables

---

## 🔐 Security

* Secrets are never logged in plain text
* All values are masked as `"***" [REDACTED]` in logs
* This Action uses only read-only access to your Vault Secrets App

---

## 🪪 License

MIT

---
