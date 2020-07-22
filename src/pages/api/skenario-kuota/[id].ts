import { Request, Response } from 'express';
import { sendRequest } from '../relay';

export default (req, res) => {
    switch (req.method) {
        case 'GET':
            GetSkenarioKuotaByID(req, res)
            break;
        case 'PUT':
            UpdateSkenarioKuota(req, res)
            break;
        case 'DELETE':
            DeleteSkenarioKuota(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function GetSkenarioKuotaByID(req: Request, res: Response) {

    var url = process.env.SKENARIO_KUOTA_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'GET'
    };
    sendRequest(options, res)
}

export function UpdateSkenarioKuota(req: Request, res: Response) {
    var options = {
        uri: process.env.SKENARIO_KUOTA_SERVICE_URL + "/" + req.query.id,
        method: 'PUT',
        json: {
            "namaSkenario": req.body.namaSkenario,
            "kuota": req.body.kuota,
            "berlakuDari": req.body.berlakuDari,
            "berlakuSampai": req.body.berlakuSampai
        }
    };
    sendRequest(options, res)
}

export function DeleteSkenarioKuota(req: Request, res: Response) {
    var url = process.env.SKENARIO_KUOTA_SERVICE_URL + "/" + req.query.id + "/delete"
    var options = {
        uri: url,
        method: 'DELETE'
    };
    sendRequest(options, res)
}
