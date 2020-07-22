import { Request, Response } from 'express';

import { sendRequest } from '../relay';

export default (req, res) => {
    if (req.method === 'GET') {
        getPesertaEligible(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}

export function getPesertaEligible(req: Request, res: Response) {
    var url = process.env.PESERTA_ELIGIBLE_SERVICE_URL + "?"

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

    if (req.query.nomorPeserta) {
        param += "&nomorPeserta=" + req.query.nomorPeserta
    }
    if (req.query.namaPeserta) {
        param += "&namaPeserta=" + req.query.namaPeserta
    }
    if (req.query.pemberiKerja) {
        param += "&pemberiKerja=" + req.query.pemberiKerja
    }
    if (req.query.noPonsel) {
        param += "&noPonsel=" + req.query.noPonsel
    }
    if (req.query.alamat) {
        param += "&alamat=" + req.query.alamat
    }
    var options = {
        uri: url + param,
        method: 'GET'
    };
    sendRequest(options, res)
}