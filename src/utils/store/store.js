import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";

const persistConfig = {
  key: "dlocked-root",
  storage,
  whitelist: ["theme", "auth"], // Persist both theme and auth
};

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
