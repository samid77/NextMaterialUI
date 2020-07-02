import { Request, Response } from 'express';
import { sendRequest } from '../../relay';
export default (req, res) => {
    switch (req.method) {
        case 'GET':
            getMitra(req, res)
            break;
        case 'POST':
            createMitra(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function getMitra(req: Request, res: Response) {

    var url = process.env.MITRA_SERVICE_URL + "?"
    var param = ""
    if (req.query.size) {
        param += "&size=" + req.query.size
    }
    if (req.query.page) {
        param += "&page=" + req.query.page
    }

    if (req.query.namaMitra) {
        param += "&namaMitra=" + req.query.namaMitra
    }
    if (req.query.tanggalMulaiPKS) {
        param += "&tanggalMulaiPKS=" + req.query.tanggalMulaiPKS
    }
    if (req.query.tanggalAkhirPKS) {
        param += "&tanggalAkhirPKS=" + req.query.tanggalAkhirPKS
    }
    if (req.query.tanggalMulaiLimit) {
        param += "&tanggalMulaiLimit=" + req.query.tanggalMulaiLimit
    }
    if (req.query.tanggalAkhirLimit) {
        param += "&tanggalAkhirLimit=" + req.query.tanggalAkhirLimit
    }
    if (req.query.targetUnit) {
        param += "&targetUnit=" + req.query.targetUnit
    }
    if (req.query.targetNominal) {
        param += "&targetNominal=" + req.query.targetNominal
    }
    if (req.query.maksimalLimit) {
        param += "&maksimalLimit=" + req.query.maksimalLimit
    }
    var options = {
        uri: url + param,
        method: 'GET'
    };
    sendRequest(options, res)
}


export function createMitra(req: Request, res: Response) {
    var options = {
        uri: process.env.MITRA_SERVICE_URL + "",
        method: 'POST',
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

