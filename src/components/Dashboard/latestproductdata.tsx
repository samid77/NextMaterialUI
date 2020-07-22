import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default [
  {
    id: uuidv4(),
    name: 'Bank Tabungan Negara - BTN',
    imageUrl: '/images/products/btn.jpg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuidv4(),
    name: 'Kliring Penjaminan Efek Indonesia',
    imageUrl: '/images/products/kpei.jpg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuidv4(),
    name: 'Bank Mandiri',
    imageUrl: '/images/products/mandiri.jpg',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuidv4(),
    name: 'Bank Centra Asia',
    imageUrl: '/images/products/bca.jpg',
    updatedAt: moment().subtract(5, 'hours')
  },
];
