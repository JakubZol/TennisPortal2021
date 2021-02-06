export default (rootEndpoint, params) => `${rootEndpoint}?${Object.keys(params).map(param => `${param}=${params[param]}`).join('&')}`

