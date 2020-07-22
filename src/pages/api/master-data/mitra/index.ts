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
    } else {
        param += "&size=10"
    }
    if (req.query.page) {
        param += "&page=" + req.query.page
    } else {
        param += "&page=1"
    }

    if (req.query.q) {
        param += "&q=" + req.query.q
    }
    if (req.query.sort_by) {
        param += "&sort_by=" + req.query.sort_by
    }
    if (req.query.asc) {
        param += "&asc=" + req.query.asc
    }

    if (req.query.nama_mitra) {
        param += "&nama_mitra=" + req.query.nama_mitra
    }
    if (req.query.tanggal_mulai_pks) {
        param += "&tanggal_mulai_pks=" + req.query.tanggal_mulai_pks
    }
    if (req.query.tanggal_akhir_pks) {
        param += "&tanggal_akhir_pks=" + req.query.tanggal_akhir_pks
    }
    if (req.query.tanggal_mulai_limit) {
        param += "&tanggal_mulai_limit=" + req.query.tanggal_mulai_limit
    }
    if (req.query.tanggal_akhir_limit) {
        param += "&tanggal_akhir_limit=" + req.query.tanggal_akhir_limit
    }
    if (req.query.target_unit) {
        param += "&target_unit=" + req.query.target_unit
    }
    if (req.query.target_nominal) {
        param += "&target_nominal=" + req.query.target_nominal
    }
    if (req.query.maksimal_limit) {
        param += "&maksimal_limit=" + req.query.maksimal_limit
    }
    if (req.query.approval_status) {
        param += "&approval_status=" + req.query.approval_status
    }
    if (req.query.target_unit_opr) {
        param += "&target_unit_opr=" + req.query.target_unit_opr
    }
    if (req.query.target_nominal_opr) {
        param += "&target_nominal_opr=" + req.query.target_nominal_opr
    }
    if (req.query.maksimal_limit_opr) {
        param += "&maksimal_limit_opr=" + req.query.maksimal_limit_opr
    }
    if (req.query.target_unit_max) {
        param += "&target_unit_max=" + req.query.target_unit_max
    }
    if (req.query.target_nominal_max) {
        param += "&target_nominal_max=" + req.query.target_nominal_max
    }
    if (req.query.maksimal_limit_max) {
        param += "&maksimal_limit_max=" + req.query.maksimal_limit_max
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

