const prod = {
    url: {
        // BASE_URL: 'https://bike-backend-service.herokuapp.com'
    }
}
const dev = {
    url: {
        // BASE_URL: 'https://bike-backend-service.herokuapp.com'
        BASE_URL: 'http://localhost:5050'
    }
}
const config = process.env.NODE_ENV === 'development' ? dev : prod;

module.exports = {
    authServiceUrl: `${config?.url?.BASE_URL}/auth`,
    candidateServiceUrl: `${config?.url?.BASE_URL}/candidate`,
}