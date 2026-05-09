export const casdoorConfig = {
  serverUrl: 'https://your-casdoor-domain.com',
  clientId: 'your-client-id',
  appName: 'YourApp',
  organizationName: 'your-org',
  redirectPath: '/callback',
  scope: 'read',
  state: 'casdoor'
}

let authProvider = null

export function initCasdoor() {
  if (typeof window !== 'undefined' && window.CasdoorSDK) {
    authProvider = new window.CasdoorSDK(casdoorConfig)
    return authProvider
  }
  return null
}

export function getAuthProvider() {
  return authProvider
}

export function getSigninUrl(redirectUri = window.location.origin + '/profile') {
  if (authProvider) {
    return authProvider.getSigninUrl(redirectUri)
  }
  return ''
}

export function getSignupUrl(redirectUri = window.location.origin + '/register') {
  if (authProvider) {
    return authProvider.getSignupUrl(redirectUri)
  }
  return ''
}
