import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import PesertaPrioritasList from '../PesertaPrioritasList'


describe('PesertaPrioritasList component', () => {
  it('should named NoPeserta', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomNoPeserta').textContent).toBe('No Peserta')
   });
   it('should named Nama Peserta', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomNamaPeserta').textContent).toBe('Nama Peserta')
   });
   it('should named Pemberi Kerja', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomPemberiKerja').textContent).toBe('Pemberi Kerja')
   });
   it('should named No Ponsel', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomNoPonsel').textContent).toBe('No Ponsel')
   });
   it('should named Alamat', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomAlamat').textContent).toBe('Alamat')
   });
   it('should named Skor', () => {
    const { getByTestId } = render(<PesertaPrioritasList />, {}); 
    expect(getByTestId('kolomSkor').textContent).toBe('Skor')
   });
})

