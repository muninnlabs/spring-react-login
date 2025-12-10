export interface AppConfig {
    redirectUri: string;
    apiBaseUrl: string;
}

const devConfig: AppConfig = {
    redirectUri: "https://reactApp/oauth2/redirect",
    apiBaseUrl: "https://springBootApp"
};

export default devConfig;