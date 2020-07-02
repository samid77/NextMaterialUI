import { Request, Response } from 'express';
import { sendRequest } from '../../relay'

export default (req, res) => {
    switch (req.method) {
        case 'GET':
            getProdukById(req, res)
            break;
        case 'PUT':
            updateProduk(req, res)
            break;
        case 'DELETE':
            deleteProduk(req, res)
            break;
        default:
            res.statusCode = 405
            res.end()
    }
}

export function deleteProduk(req: Request, res: Response) {

    var url = process.env.PRODUK_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'DELETE'
    };
    sendRequest(options, res)
}
export function getProdukById(req: Request, res: Response) {
    var url = process.env.PRODUK_SERVICE_URL + "/" + req.query.id
    var options = {
        uri: url,
        method: 'GET'
    };
    sendRequest(options, res)
}
export function updateProduk(req: Request, res: Response) {
    var options = {
        uri: process.env.PRODUK_SERVICE_URL + "/" + req.query.id,
        method: 'PUT',
        json: {
            "idFiturProduk": req.body.idFiturProduk,
            "namaFiturProduk": req.body.namaFiturProduk,
            "idTipeProduk": req.body.idTipeProduk,
            "namaTipeProduk": req.body.namaTipeProduk,
            "namaSegmen": req.body.namaSegmen,
            "penghasilanDari": req.body.penghasilanDari,
            "penghasilanSampai": req.body.penghasilanSampai,
            "plafon": req.body.plafon,
            "sukuBunga": req.body.sukuBunga,
            "tenor": req.body.tenor,
        }
    };
    sendRequest(options, res)
}
