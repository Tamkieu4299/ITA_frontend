import { applyMiddleware, compose, combineReducers, createStore, Action } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import loaderReducer from "components/Loader/loaderSlice";
import studioReducer from "pages/Studio/studioSlice";
import authReducer from "pages/Auth/authSlice";
import userReducer from "pages/User/userSlice";
import cvInformationReducer from "pages/CVInformation/cvInformationSlice";
import jdInformationReducer from "pages/JDInformation/jdInformationSlice";
import jobListReducer from "pages/DisplayJobList/displayJobListSlice";
import avatarListReducer from "pages/DisplayAvatarList/displayAvatarListSlice";

const persistConfig = {
    key: "primary",
    storage
};

const middlewares = [thunk.withExtraArgument({})];

export const rootReducer = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    studio: studioReducer,
    user: userReducer,
    cvInformation: cvInformationReducer,
    jdInformation: jdInformationReducer,
    jobList: jobListReducer,
    avatarList: avatarListReducer
});

export const makeStore = (initialState = {}) => {
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(
        persistedReducer,
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    const persistor = persistStore(store);

    return { store, persistor };
};

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<typeof rootReducer, undefined, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;
