import storage from 'redux-persist/lib/storage'
import createEncryptor from 'redux-persist-transform-encrypt';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
// import { persistSecretKey } from 'configurations/index';

const encryptor = createEncryptor({
  secretKey: 'persistSecretKey',
  onError(error) {
    console.log('createEncryptor error ', error); // eslint-disable-line
  },
});
 
const saveAuthSubsetBlacklistFilter = createBlacklistFilter('auth', ['data', 'action']);

const persistConfig = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'root',
    storage,
    transforms: [],
  },
};

export default persistConfig;