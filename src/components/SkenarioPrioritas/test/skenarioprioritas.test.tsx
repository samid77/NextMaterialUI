import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import SkenarioPrioritasList from '../SkenarioPrioritasList'


describe('SkenarioPrioritasList component', () => {
  it('should named Nama Skenario', () => {
    const { getByTestId } = render(<SkenarioPrioritasList />, {}); 
    expect(getByTestId('kolomNamaSkenario').textContent).toBe('Nama Skenario')
   });
   it('should named Kriteria', () => {
    const { getByTestId } = render(<SkenarioPrioritasList />, {}); 
    expect(getByTestId('kolomKriteria').textContent).toBe('Kriteria')
   });
   it('should named Berlaku Dari', () => {
    const { getByTestId } = render(<SkenarioPrioritasList />, {}); 
    expect(getByTestId('kolomBerlakuDari').textContent).toBe('Berlaku Dari')
   });
   it('should named Berlaku Sampai', () => {
    const { getByTestId } = render(<SkenarioPrioritasList />, {}); 
    expect(getByTestId('kolomBerlakuSampai').textContent).toBe('Berlaku Sampai')
   });
})

