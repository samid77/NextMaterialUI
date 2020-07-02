import { Request, Response } from 'express';
import { sendRequest } from '../../relay'

export default (req, res) => {
  switch (req.method) {
    case 'GET':
      getProduk(req, res)
      break;
    case 'POST':
      createProduk(req, res)
      break;
    default:
      res.statusCode = 405
      res.end()
  }
}

function getProduk(req: Request, res: Response) {

  var url = process.env.PRODUK_SERVICE_URL + "?"
  var param = ""
  if (req.query.size) {
    param += "&size=" + req.query.size
  }
  if (req.query.page) {
    param += "&page=" + req.query.page
  }
  if (req.query.q) {
    param += "&q=" + req.query.q
  }

  if (req.query.namaFiturProduk) {
    param += "&namaFiturProduk=" + req.query.namaFiturProduk
  }
  if (req.query.namaTipeProduk) {
    param += "&namaTipeProduk=" + req.query.namaTipeProduk
  }
  if (req.query.namaSegmen) {
    param += "&namaSegmen=" + req.query.namaSegmen
  }
  if (req.query.penghasilanDari) {
    param += "&penghasilanDari=" + req.query.penghasilanDari
  }
  if (req.query.penghasilanSampai) {
    param += "&penghasilanSampai=" + req.query.penghasilanSampai
  }
  if (req.query.plafon) {
    param += "&plafon=" + req.query.plafon
  }
  if (req.query.sukuBunga) {
    param += "&sukuBunga=" + req.query.sukuBunga
  }
  if (req.query.tenor) {
    param += "&tenor=" + req.query.tenor
  }
  if (req.query.orderBy) {
    param += "&orderBy=" + req.query.orderBy
  }
  if (req.query.desc) {
    param += "&desc=" + req.query.desc
  }
  var options = {
    uri: url + param,
    method: 'GET'
  };
  sendRequest(options, res)
}


function createProduk(req: Request, res: Response) {
  var options = {
    uri: process.env.PRODUK_SERVICE_URL + "",
    method: 'POST',
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
