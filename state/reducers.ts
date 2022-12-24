import { combineReducers } from '@reduxjs/toolkit'
import { applyMiddleware} from 'redux'
import  projectReducer from "@views/contracts/state";
import storage from 'redux-persist/lib/storage'
import { smartViewApi } from "@services/api"


  export const store = combineReducers({
    [smartViewApi.reducerPath]: smartViewApi.reducer,
   projectReducer,
    // auth: persistReducer(authPersistConfig, auth),  
}
);