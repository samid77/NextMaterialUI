import { Request, Response } from 'express';
import { sendRequest } from '../relay';

export default (req, res) => {
  if (req.method === 'GET') {
    countPeserta(req, res)
  } else {
    res.statusCode = 405
    res.end()
  }
}

export function countPeserta(req: Request, res: Response) {

  var url = process.env.ELIGIBLE_SERVICE_URL + "/countpeserta"
  var options = {
    uri: url,
    method: 'GET'
  };
  sendRequest(options, res)
}
