import { Request, Response } from 'express';
import { sendRequest } from '../../relay';
export default (req, res) => {
    if (req.method === 'GET') {
        getMitraName(req, res)
    }
    else {
        res.statusCode = 405
        res.end()
    }
}

export function getMitraName(req: Request, res: Response) {
    var options = {
        uri: process.env.MITRA_SERVICE_URL + "name?page=1&size=100",
        method: 'GET'
    };
    sendRequest(options, res)
}

