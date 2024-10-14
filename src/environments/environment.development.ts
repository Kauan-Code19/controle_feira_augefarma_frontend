export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
}

let brokerUrlString = 'ws://localhost:8080/realtime'

if (typeof window !== 'undefined') {
    environment.apiUrl = `http://${window.location.hostname}:8080`
    brokerUrlString = `ws://${window.location.hostname}:8080/realtime`
}

export const brokerURL = brokerUrlString