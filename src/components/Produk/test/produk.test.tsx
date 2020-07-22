import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import ProdukList from '../ProdukList'


describe('ProdukList component', () => {
  it('should named Jenis Pembiayaan', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomJenisPembiayaan').textContent).toBe('Jenis Pembiayaan')
   });

   it('should named Bentuk Pembiayaan', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomBentukPembiayaan').textContent).toBe('Bentuk Pembiayaan')
   });

   it('should named Nama Segmen', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomNamaSegmen').textContent).toBe('Nama Segmen')
   });

   it('should named Penghasilan', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomPenghasilan').textContent).toBe('Penghasilan')
   });

   it('should named Plafon', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomPlafon').textContent).toBe('Plafon')
   });

   it('should named Suku Bunga', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomSukuBunga').textContent).toBe('Suku Bunga')
   });

   it('should named Tenor', () => {
    const { getByTestId } = render(<ProdukList />, {}); 
    expect(getByTestId('kolomTenor').textContent).toBe('Tenor')
   });
})

