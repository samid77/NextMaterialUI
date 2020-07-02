import { Request, Response } from 'express';
import { sendRequest } from '../../../relay';
export default (req, res) => {
    if (req.method === 'GET') {
        exportCsv(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}
export function exportCsv(req: Request, res: Response) {

    var options = {
        uri: process.env.PRODUK_SERVICE_URL + "/export/csv",
        method: 'GET'
    };
    sendRequest(options, res)
}