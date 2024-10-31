export const environment = {
    production: false,
    apiUrl: '' , //'http://localhost:8080',//
    brokerURL: '' //'ws://localhost:8080/realtime'//
}


// if (typeof window !== 'undefined') {
//     environment.apiUrl = `http://${window.location.hostname}:8080`
//     environment.brokerURL = `ws://${window.location.hostname}:8080/realtime`
// }