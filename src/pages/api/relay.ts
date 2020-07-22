import { Response } from 'express';
const request = require('request');
const path = require('path');
export function sendRequest(options, res) {
    console.log(options.uri)
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
export function getExcel(url, res: Response) {
    var r = request(url);
    r.on('response', function (response) {
        if (response.headers['content-disposition']) {
            res.setHeader("Content-Disposition", response.headers['content-disposition']);
        }
        response.pipe(res);
    });
    r.on('error', function (e) {
        res.statusCode = 500
        res.send(e)
    });
}