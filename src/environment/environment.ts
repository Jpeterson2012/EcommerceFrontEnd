let local = true
export const environment = local ? {
    production: false,
    
    apiAUTHURL: 'http://localhost:8080/api/auth/',
    apiURL: 'http://localhost:8080/',
    homeURL: 'http://localhost:4200/home'
} 
: {
    production: false,
    apiAUTHURL: 'https://playground2.jmpeterson.dev/api/auth/',
    apiURL: 'https://playground2.jmpeterson.dev/',
    homeURL: 'https://bookshop.jmpeterson.dev/home'
    };