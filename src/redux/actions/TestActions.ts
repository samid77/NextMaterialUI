import { TESTREDUX } from 'redux/constants/TestConstants';

export const testRedux = (value: string) => ({ type: TESTREDUX, data: value });