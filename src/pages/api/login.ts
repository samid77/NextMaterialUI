import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        res.json({req: req.body})
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}