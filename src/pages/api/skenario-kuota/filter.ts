import { Request, Response } from 'express';
import { sendRequest } from '../relay';
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
        uri: process.env.SKENARIO_KUOTA_SERVICE_URL + "/filter",
        method: 'POST',
        json: {
            "kuotaPeserta": req.body.kuotaPeserta
        }
    };

    sendRequest(options, res)
}