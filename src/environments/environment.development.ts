export const environment = {
    production: false,
    apiUrl: 'https://localhost:8080',
}

let brokerUrlString = 'wss://localhost:8080/realtime'

if (typeof window !== 'undefined') {
    environment.apiUrl = `https://${window.location.hostname}:8080`
    brokerUrlString = `wss://${window.location.hostname}:8080/realtime`
}

export const brokerURL = brokerUrlString