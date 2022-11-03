import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/AuthSlice";
import userReducer from "./reducers/UserSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
let persistor = persistStore(store);

export {store, persistor}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;