import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './tinyUrlSlice';

export const store = configureStore({
	reducer: {
		urlEntries: contactReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let id = 0;

export function* generateId() {
	while (true) {
		yield ++id;
	}
}

export const PAGE_SIZE = 25;


