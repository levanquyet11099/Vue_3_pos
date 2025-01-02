const config  = {
    PAGEINATION: process.env.NODE_ENV === 'production' ? 20 : 20,

    // BASE_URL: process.env.NODE_ENV === 'production' ? 'https://fchat.vn/' : 'https://fchat.vn/',
    // WEBHOOK_URL: process.env.NODE_ENV === 'production' ? 'https://fchatvn-amazon.salekit.com:4032' : 'https://fchatvn-amazon.salekit.com:4032',
    // SOCKET_URL: process.env.NODE_ENV === 'production' ? 'https://fchatvn-amazon.salekit.com:4033' : 'https://fchatvn-amazon.salekit.com:4033',
    // API_URL: process.env.NODE_ENV === 'production' ? 'https://fchat-app.salekit.com:4039/api/v1/' : 'https://fchat-app.salekit.com:4039/api/v1/',
    // API_URL_CLIENT: process.env.NODE_ENV === 'production' ? 'https://fchat.vn/api_v1/' : 'https://fchat.vn/api_v2/',
    API_SALEKIT: process.env.NODE_ENV === 'production' ? 'https://api.salekit.com:3039/api/v1/' : 'https://api.salekit.com:3039/api/v1/',
    // API_URL_CLIENT: process.env.NODE_ENV === 'production' ? 'https://fchat.vn/api_v1/' : 'http://fchat.vn.test/api_v2/',

    // DOMAIN_URL: process.env.NODE_ENV === 'production' ? 'https://fchat-app.salekit.com:4039/' : 'https://fchat-app.salekit.com:4039/',
    // DOMAIN_URL: process.env.NODE_ENV === 'production' ? 'http://localhost:4039/' : 'http://localhost:4039/',
    // API_URL: process.env.NODE_ENV === 'production' ? 'http://localhost:4039/api/v1/' : 'http://localhost:4039/api/v1/',
    // API_SALEKIT: process.env.NODE_ENV === 'production' ? 'http://localhost:3039/api/v1/' : 'http://localhost:3039/api/v1/',
    // API_URL_local: process.env.NODE_ENV === 'production' ? 'http://localhost:4039/api/v1/' : 'http://localhost:4039/api/v1/',

}
export default config;