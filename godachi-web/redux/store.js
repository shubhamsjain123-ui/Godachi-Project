import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const bindMiddleware = (middleware) => {
   // if (process.env.NODE_ENV !== "development") {
   //    const { composeWithDevTools } = require("redux-devtools-extension");
   //    return composeWithDevTools(applyMiddleware(...middleware));
   // }
   return applyMiddleware(...middleware);
};
const reducer = (state, action) => {
   if (action.type === HYDRATE) {
      const nextState = {
         ...state,
         ...action.payload,
      };
      //console.log("nextState",nextState)
      return nextState;
   } else {
      return rootReducer(state, action);
   }
   //return rootReducer(state, action);
};

const initStore = () => {
   //return createStore(reducer, bindMiddleware([thunk]));
   const persistConfig = {
      key: 'root',
      storage: storage,
      blacklist: ['filterProducts','filterMasters']
    };
    const persistedReducer = persistReducer(persistConfig, reducer)
    //const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store = createStore(persistedReducer, bindMiddleware([thunk]))
    store.__PERSISTOR = persistStore(store);
    return store ;
};

export const wrapper = createWrapper(initStore);
