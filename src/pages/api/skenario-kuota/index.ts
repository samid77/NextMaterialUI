import { Request, Response } from 'express';
import { sendRequest } from '../relay';
export default (req, res) => {
    if (req.method == "GET") {

        GetSkenarioKuota(req, res)
    }
    else {
        res.statusCode = 405
        res.end()
    }
}

export function GetSkenarioKuota(req: Request, res: Response) {

    var url = process.env.SKENARIO_KUOTA_SERVICE_URL + "?"
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
    if (req.query.namaSkenario) {
        param += "&namaSkenario=" + req.query.namaSkenario
    }
    if (req.query.tanggalBerlaku) {
        param += "&tanggalBerlaku=" + req.query.tanggalBerlaku
    }
    var options = {
        uri: url + param,
        method: 'GET'
    };
    sendRequest(options, res)
}


