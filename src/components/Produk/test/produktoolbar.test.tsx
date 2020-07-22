import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import ProdukToolbar from '../ProdukToolbar'


describe('ProdukToolbar component', () => {
  it('ProdukToolbar component rendered', () => {
    const checkProdukToolbar = render(<ProdukToolbar />, {})
  })
  // it('Should take ProdukToolbar snapshot', () => {
  //   const {asFragment} = render(<ProdukToolbar />, {})
  //   expect(asFragment(<ProdukToolbar />)).toMatchSnapshot()
  // })
})

