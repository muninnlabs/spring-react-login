export interface AppConfig {
    redirectUri: string;
    apiBaseUrl: string;
}

const devConfig: AppConfig = {
    apiBaseUrl: 'http://localhost:8080',
    redirectUri: 'http://localhost:3000/oauth2/redirect'
};

export default devConfig;