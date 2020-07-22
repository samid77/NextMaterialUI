import { Request, Response } from 'express';

import { sendRequest } from '../relay';

export default (req, res) => {
    if (req.method === 'GET') {
        getPesertaPrioritas(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}

export function getPesertaPrioritas(req: Request, res: Response) {
    var url = process.env.PESERTA_PRIORITY_SERVICE_URL + "?"

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

    if (req.query.prioritas) {
        param += "&prioritas=" + req.query.prioritas
    }
    if (req.query.namaPeserta) {
        param += "&namaPeserta=" + req.query.namaPeserta
    }
    if (req.query.noPeserta) {
        param += "&noPeserta=" + req.query.noPeserta
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
    if (req.query.skor) {
        param += "&skor=" + req.query.skor
    }
    if (req.query.prioritasMax) {
        param += "&prioritasMax=" + req.query.prioritasMax
    }
    if (req.query.skorMax) {
        param += "&skorMax=" + req.query.skorMax
    }
    if (req.query.prioritasOpr) {
        param += "&prioritasOpr=" + req.query.prioritasOpr
    }
    if (req.query.skorOpr) {
        param += "&skorOpr=" + req.query.skorOpr
    }
    if (req.query.asc) {
        param += "&asc=" + req.query.asc
    }
    if (req.query.sortBy) {
        param += "&sortBy=" + req.query.sortBy
    }
    var options = {
        uri: url + param,
        method: 'GET'
    };
    sendRequest(options, res)
}