import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./Reducers/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,    //Local storage
};

const rootReducer = combineReducers({ //Combines the reduces into rootReducer for scalability
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);  //Wraps the root reducer with persistence capabilities

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);