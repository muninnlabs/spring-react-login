import keys from '../config/key';

export const API_BASE_URL = keys.apiBaseUrl;
export const OAUTH2_REDIRECT_URI = keys.redirectUri;
export const ACCESS_TOKEN = 'accessToken';

console.log('API_BASE_URL:', API_BASE_URL);
console.log('OAUTH2_REDIRECT_URI:', OAUTH2_REDIRECT_URI);

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;

console.log('Full Google Auth URL:', GOOGLE_AUTH_URL);