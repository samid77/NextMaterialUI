import { Request, Response } from 'express';
import { sendRequest } from '../../../relay';

export default (req, res) => {
    if (req.method === 'GET') {
        exportExcel(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}
export function exportExcel(req: Request, res: Response) {

    var options = {
        uri: process.env.PRODUK_SERVICE_URL + "/export/excel",
        method: 'GET'
    };
    sendRequest(options, res)
}