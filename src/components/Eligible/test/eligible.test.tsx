import React from 'react'
import { render, fireEvent } from '../../../test/testUtils'
import ChartEligible from '../ChartEligible'
import EligibleList from '../EligibleList'
import GrafikEligible from '../GrafikEligible'

describe('ChartEligible component', () => {
  it('ChartEligible component rendered', () => {
    const checkChartEligible = render(<ChartEligible />, {})
  })
})

describe('EligibleList component', () => {
  it('EligibleList component rendered', () => {
    const checkEligibleList = render(<EligibleList />, {})
  })
})

describe('GrafikEligible component', () => {
  it('GrafikEligible component rendered', () => {
    const checkGrafikEligible = render(<GrafikEligible />, {})
  })
})
