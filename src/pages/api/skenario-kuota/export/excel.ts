import { Request, Response } from 'express';
import { getExcel } from '../../relay';
export default (req, res) => {
    if (req.method === 'GET') {
        exportExcel(req, res)
    } else {
        res.statusCode = 405
        res.end()
    }
}

export function exportExcel(req: Request, res: Response) {
    getExcel(process.env.SKENARIO_KUOTA_SERVICE_URL + "/export/excel", res)
}