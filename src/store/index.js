import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { departementsReducer as departements } from './departements';
import { ofsReducer as ofs } from './ofs';
import { produitsReducer as produits } from './produits';
import { usersReducer as users } from './users';
import { sessionReducer as session } from './session';

//import { stoptimesReducer as defauts } from './defauts';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const reducer = combineReducers({
  departements,
  ofs,
  produits,
  users,
  session,
});

export { departementsActions } from './departements';
export { ofsActions } from './ofs';
export { produitsActions } from './produits';
export { usersActions } from './users';
export { sessionActions } from './session';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
