import storage from 'redux-persist/lib/storage';

const hook: any = (state: any, action: any) => {
  // do your hook here
  return { state, action };
};

export default hook;
