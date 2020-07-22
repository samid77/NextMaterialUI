import { Request, Response } from 'express';
import { sendRequest } from '../relay';
export default (req, res) => {
    if (req.method == "POST") {
        CreateSkenarioKuota(req, res)
    }
    else {
        res.statusCode = 405
        res.end()
    }
}

export function CreateSkenarioKuota(req: Request, res: Response) {
    var options = {
        uri: process.env.SKENARIO_KUOTA_SERVICE_URL + "/create",
        method: 'POST',
        json: {
            "namaSkenario": req.body.namaSkenario,
            "kuota": req.body.kuota,
            "berlakuDari": req.body.berlakuDari,
            "berlakuSampai": req.body.berlakuSampai
        }
    };
    sendRequest(options, res)
}
