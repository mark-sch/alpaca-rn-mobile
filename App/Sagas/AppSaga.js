export function* appStartAttempt(api, action) {
    const { apiKey, secretKey, baseUrl } = action.data
    api.setBaseURL(baseUrl)
    api.setHeaders(apiKey, secretKey)
}
