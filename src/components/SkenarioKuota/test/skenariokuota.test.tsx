import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import SkenarioKuotaList from '../SkenarioKuotaList'


describe('SkenarioKuotaList component', () => {
  it('should named Nama Skenario', () => {
    const { getByTestId } = render(<SkenarioKuotaList />, {}); 
    expect(getByTestId('kolomNamaSkenario').textContent).toBe('Nama Skenario')
   });
   it('should named Kuota', () => {
    const { getByTestId } = render(<SkenarioKuotaList />, {}); 
    expect(getByTestId('kolomKuota').textContent).toBe('Kuota')
   });
   it('should named Berlaku Dari', () => {
    const { getByTestId } = render(<SkenarioKuotaList />, {}); 
    expect(getByTestId('kolomBerlakuDari').textContent).toBe('Berlaku Dari')
   });
   it('should named Berlaku Sampai', () => {
    const { getByTestId } = render(<SkenarioKuotaList />, {}); 
    expect(getByTestId('kolomBerlakuSampai').textContent).toBe('Berlaku Sampai')
   });
})

