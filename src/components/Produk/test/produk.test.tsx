import React from 'react'
import { render } from '../../../test/testUtils'
import ProdukList from '../ProdukList'
import ProdukToolbar from '../ProdukToolbar'

describe('ProdukList component', () => {
  it('ProdukList component rendered', () => {
    const checkProdukList = render(<ProdukList />, {})
  })
})

describe('ProdukToolbar component', () => {
  it('ProdukToolbar component rendered', () => {
    const checkProdukToolbar = render(<ProdukToolbar />, {})
  })
})

