import { Request, Response } from 'express';
import { sendRequest } from '../relay';
export default (req, res) => {
    switch (req.method) {
        case 'GET':
            GetSkenarioPrioritas(req, res)
            break;
        case 'POST':
            CreateSkenarioPrioritas(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function GetSkenarioPrioritas(req: Request, res: Response) {

    var url = process.env.SKENARIO_PRIORITY_SERVICE_URL + "?"
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

    if (req.query.nama_skenario) {
        param += "&nama_skenario=" + req.query.nama_skenario
    }
    if (req.query.tanggal_berlaku) {
        param += "&tanggal_berlaku=" + req.query.tanggal_berlaku
    }
    var options = {
        uri: url + param,
        method: 'GET'
    };
    sendRequest(options, res)
}


export function CreateSkenarioPrioritas(req: Request, res: Response) {
    var options = {
        uri: process.env.SKENARIO_PRIORITY_SERVICE_URL + "",
        method: 'POST',
        json: {
            "namaSkenario": req.body.namaSkenario,
            "kriteria1": req.body.kriteria1,
            "kriteria2": req.body.kriteria2,
            "kriteria3": req.body.kriteria3,
            "kriteria4": req.body.kriteria4,
            "kriteria5": req.body.kriteria5,
            "berlakuDari": req.body.berlakuDari,
            "berlakuSampai": req.body.berlakuSampai
        }
    };
    sendRequest(options, res)
}

