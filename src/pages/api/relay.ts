const request = require('request');
export function sendRequest(options, res) {
    request(options, function (error, response) {
        try {
            if (response.headers['content-disposition']) {
                res.setHeader("Content-Disposition", response.headers['content-disposition']);
            }
            res.setHeader("Content-Type", response.headers['content-type']);
            res.statusCode = response.statusCode
            res.send(response.body)
        } catch {
            res.statusCode = 500
            res.send(error)
        }
    });
}