// "proxy": {
//     "/apis": {
//         "target": "https://i.snssdk.com",
//         "changeOrigin": true,
//         "pathRewrite": {
//             "^/apis": ""
//         }
//     }
// }
const proxy = require('http-proxy-middleware')
    // module.exports = function(app) {
    //     app.use(proxy('/apis', { target: 'https://i.snssdk.com', changeOrigin: true, pathRewrite: { "/apis": "" } }))
    // }
module.exports = function(app) {
    app.use(proxy.createProxyMiddleware('/apis', { target: 'https://i.snssdk.com' }));
}