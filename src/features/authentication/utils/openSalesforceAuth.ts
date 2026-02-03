const SALESFORCE_URLS = {
  production: 'https://login.salesforce.com',
  sandbox: 'https://test.salesforce.com',
};

export function openSalesforceAuth(environment: 'production' | 'sandbox' = 'production'): void {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const baseUrl = SALESFORCE_URLS[environment];
  
  const params = new URLSearchParams({
    response_type: 'token',
    client_id: clientId,
    redirect_uri: redirectUri,
  });
  
  const url = `${baseUrl}/services/oauth2/authorize?${params.toString()}`;
  window.open(url, 'salesforce_auth', 'width=500,height=700');
}
