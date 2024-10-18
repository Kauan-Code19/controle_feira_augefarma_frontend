export const environment = {
    production: false,
    apiUrl: '',
}

let brokerUrlString = ''

// if (typeof window !== 'undefined') {
//     environment.apiUrl = `http://${window.location.hostname}:8080`
//     brokerUrlString = `ws://${window.location.hostname}:8080/realtime`
// }

export const brokerURL = brokerUrlString