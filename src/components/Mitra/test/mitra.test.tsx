import React from 'react'
import { render } from '../../../test/testUtils'
import MitraList from '../MitraList'
import MitraToolbar from '../MitraToolbar'

describe('MitraList component', () => {
  it('MitraList component rendered', () => {
    const checkMitraList = render(<MitraList />, {})
  })
})

describe('MitraToolbar component', () => {
  it('MitraToolbar component rendered', () => {
    const checkMitraToolbar = render(<MitraToolbar />, {})
  })
})

