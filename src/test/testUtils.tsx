import { render } from '@testing-library/react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Store, Persistore } from '../redux/core/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const AppWrapper = ({children}) => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistore}>
        {children}
      </PersistGate>
    </Provider>
  )
}
const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AppWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
