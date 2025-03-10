import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { postAPI } from 'services/PostService';
import adminReducer from './reducers/adminSlice';
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
	user: userReducer,
	admin: adminReducer,
	[postAPI.reducerPath]: postAPI.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(postAPI.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();
