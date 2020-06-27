import React from 'react'
import { render, fireEvent } from '../../../test/testUtils'
import LatestOrders from '../LatestOrders'
import LatestProducts from '../LatestProducts'
import StatusBullet from '../StatusBullet'
import TasksProgress from '../TasksProgress'

describe('LatestOrders component', () => {
  it('LatestOrders component rendered', () => {
    const checkLatestOrders = render(<LatestOrders />, {})
  })
})

describe('LatestProducts component', () => {
  it('LatestProducts component rendered', () => {
    const checkLatestProducts = render(<LatestProducts />, {})
  })
})

describe('StatusBullet component', () => {
  it('StatusBullet component rendered', () => {
    const checkStatusBullet = render(<StatusBullet />, {})
  })
})

describe('TasksProgress component', () => {
  it('TasksProgress component rendered', () => {
    const checkTasksProgress = render(<TasksProgress />, {})
  })
})
