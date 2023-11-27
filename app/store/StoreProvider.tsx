import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from './reducers/RootReducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/* const reduxFirebaseConfig = {
  userProfile: 'users' // save users profiles to 'users' collection
}; */

let composeEnhancers: any = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [/* "modules", */ "settings"]
}

const configureStore = () => {
  //const [rehydrated, setRehydrated] = useState(false);

  const persistedReducer = persistReducer(persistConfig, RootReducer);
  const middlewares = [thunk.withExtraArgument({})];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];

  const enhancers = composeEnhancers(
    ...storeEnhancers,
    //reactReduxFirebase(firebase, reduxFirebaseConfig)
  );

  const store: any = createStore(
    persistedReducer,
    enhancers
  );

  const persistor = persistStore(store);

  return { store: store, persistor: persistor };
};

const AppStoreProvider = (props: any) => {
  let store: any;

  store = store || configureStore();

  return (
    <Provider store={store.store}>
      {props.children}
    </Provider>
  );

}

export default AppStoreProvider;
