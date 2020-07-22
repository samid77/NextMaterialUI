import { Request, Response } from 'express';
import { sendRequest } from '../relay';

export default (req, res) => {
    switch (req.method) {
        case 'GET':
            GetSkenarioPrioritasByID(req, res)
            break;
        case 'PUT':
            UpdateSkenarioPrioritas(req, res)
            break;
        case 'DELETE':
            DeleteSkenarioPrioritas(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function GetSkenarioPrioritasByID(req: Request, res: Response) {

    var url = process.env.SKENARIO_PRIORITY_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'GET'
    };
    sendRequest(options, res)
}

export function UpdateSkenarioPrioritas(req: Request, res: Response) {
    var options = {
        uri: process.env.SKENARIO_PRIORITY_SERVICE_URL + "/" + req.query.id,
        method: 'PUT',
        json: {
            "berlakuDari": req.body.berlakuDari,
            "berlakuSampai": req.body.berlakuSampai
        }
    };
    sendRequest(options, res)
}

export function DeleteSkenarioPrioritas(req: Request, res: Response) {

    var url = process.env.SKENARIO_PRIORITY_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'DELETE'
    };
    sendRequest(options, res)
}
