export interface DefaultState {
  fetch: boolean,
  error: object | object[] | string | null,
  response: object | object[] | string | null,
  action: string | null,
}

export interface DefaultAction {
  type: string | null,
  data?: object | object[] | string | null,
}