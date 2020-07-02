import { Request, Response } from 'express';

import { sendRequest } from '../../relay';

export default (req, res) => {
    if (req.method === 'GET') {
        getFiturProduk(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}

export function getFiturProduk(req: Request, res: Response) {

    var options = {
        uri: process.env.PRODUK_SERVICE_URL + "/fitur-produk/",
        method: 'GET'
    };
    sendRequest(options, res)
}