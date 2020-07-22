import React from 'react'
import { render } from '../../../test/testUtils'
import MitraList from '../MitraList'

describe('MitraList component', () => {
  it('should named Nama Mitra', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomNamaMitra').textContent).toBe('Nama Mitra')
   });

   it('should named Tanggal PKS', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomTanggalPKS').textContent).toBe('Tanggal PKS')
   });
   it('should named Tanggal Limit', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomTanggalLimit').textContent).toBe('Tanggal Limit')
   });

   it('should named Target Nominal', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomTargetNominal').textContent).toBe('Target Nominal')
   });
   it('should named Maksimal Limit', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomMaksimalLimit').textContent).toBe('Maksimal Limit')
   });
   it('should named Approval Status', () => {
    const { getByTestId } = render(<MitraList />, {}); 
    expect(getByTestId('kolomApprovalStatus').textContent).toBe('Approval Status')
   });
})

