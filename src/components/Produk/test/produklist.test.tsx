import React from 'react'
import { render, cleanup } from '../../../test/testUtils'
import ProdukList from '../ProdukList'
import ProdukToolbar from '../ProdukToolbar'

describe('ProdukList component', () => {
  it('ProdukList component rendered', () => {
    const checkProdukList = render(<ProdukList />, {})
  })
})