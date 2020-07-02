import { Request, Response } from 'express';
import { sendRequest } from '../../relay';

export default (req, res) => {
    switch (req.method) {
        case 'GET':
            getMitraById(req, res)
            break;
        case 'PUT':
            updateMitra(req, res)
            break;
        case 'DELETE':
            deleteMitra(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function getMitraById(req: Request, res: Response) {

    var url = process.env.MITRA_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'GET'
    };
    sendRequest(options, res)
}

export function updateMitra(req: Request, res: Response) {
    var options = {
        uri: process.env.MITRA_SERVICE_URL + "/" + req.query.id,
        method: 'PUT',
        json: {
            "namaMitra": req.body.namaMitra,
            "tanggalMulaiPKS": req.body.tanggalMulaiPKS,
            "tanggalAkhirPKS": req.body.tanggalAkhirPKS,
            "tanggalMulaiLimit": req.body.tanggalMulaiLimit,
            "tanggalAkhirLimit": req.body.tanggalAkhirLimit,
            "targetUnit": req.body.targetUnit,
            "targetNominal": req.body.targetNominal,
            "maksimalLimit": req.body.maksimalLimit
        }
    };
    sendRequest(options, res)
}

export function deleteMitra(req: Request, res: Response) {

    var url = process.env.MITRA_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'DELETE'
    };
    sendRequest(options, res)
}
