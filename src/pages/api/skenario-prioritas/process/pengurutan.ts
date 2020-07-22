import { Request, Response } from 'express';
import { sendRequest } from '../../relay';
export default (req, res) => {
    if (req.method === 'POST') {
        prosesPengurutan(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}
export function prosesPengurutan(req: Request, res: Response) {

    var options = {
        uri: process.env.SKENARIO_PRIORITY_SERVICE_URL + "/process/pengurutan",
        method: 'POST'
    };
    sendRequest(options, res)
}