import { Request, Response } from 'express';

import { sendRequest } from '../../relay';

export default (req, res) => {
    if (req.method === 'GET') {
        getTipeProduk(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}

export function getTipeProduk(req: Request, res: Response) {

    var options = {
        uri: process.env.PRODUK_SERVICE_URL + "/tipe-produk/",
        method: 'GET'
    };
    sendRequest(options, res)
}