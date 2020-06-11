import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import 'dotenv/config';

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_PERSIST_SECRET || '',
  onError(error) {
    console.log('createEncryptor error ', error);
  },
});

const saveAuthSubsetBlacklistFilter = createBlacklistFilter('auth', ['data', 'action']);

const ConfigPersist = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'root',
    storage,
    transforms: [saveAuthSubsetBlacklistFilter, encryptor],
  },
};

export default ConfigPersist;
