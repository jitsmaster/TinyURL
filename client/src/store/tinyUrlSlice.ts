import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UrlEntry } from "../model/models";


export const HOST = 'http://localhost:7231/';

export const loadThunk = createAsyncThunk(
	'load',
	async (payload: { startIndex: number, pageSize: number, filter: string }, _) => {
		try {
			const resp = await fetch(`/TinyURL/list?startIndex=${payload.startIndex}&pageSize=${payload.pageSize}&filter=${payload.filter}`,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				});

			return resp.json();
		} catch (error: any) {
			alert(`Error loading URL listing: ${error.message}`);
			return null;
		}
	},
)

export const addThunk = createAsyncThunk(
	'add',
	async (payload: { url: string, customUrl: string }, _) => {
		try {
			const resp = await fetch(`/TinyURL/add?url=${payload.url}&customUrl=${payload.customUrl}`,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'PUT'
				})

			const shortUrl = await resp.body?.getReader().read().then((data) => new TextDecoder().decode(data.value));
			return {
				url: payload.url,
				shortUrl: shortUrl?.substring(1, shortUrl.length - 1)
			}
		} catch (error: any) {
			alert(`Error adding URL: ${error.message}`);
			return null;
		}
	},
)


export const removeThunk = createAsyncThunk(
	'remove',
	async (shortUrl: string, _) => {
		try {
			const resp = await fetch(`/TinyURL/remove?shortUrl=${shortUrl}`,
				{
					method: 'DELETE'
				})
			const deleted = await resp.body?.getReader().read().then((data) => new TextDecoder().decode(data.value)) === 'true'
			if (deleted) {
				return shortUrl;
			}

			return null;
		} catch (error: any) {
			alert(`Error removing URL: ${error.message}`);
			return null;
		}
	},
)

export const tinyUrlSlice = createSlice({
	name: 'tinyUrl',
	initialState: {
		entries: [] as UrlEntry[],
		currentIndex: 0,
		totalCount: 0
	},
	extraReducers(builder) {
		builder.addCase(loadThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.entries = action.payload.entries;
				state.currentIndex = action.payload.currentIndex;
				state.totalCount = action.payload.totalCount;
			}
		});
		builder.addCase(addThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.entries.unshift({
					originalUrl: action.payload.url,
					shortUrl: action.payload.shortUrl as string,
					visited: 0
				});
				alert(`Tiny URL ${HOST}${action.payload.shortUrl} added for: ${action.payload.url}`);
			}
		});
		builder.addCase(removeThunk.fulfilled, (state, action) => {
			if (action.payload) {
				state.entries = state.entries.filter((entry) => entry.shortUrl !== action.payload);
				alert(`Tiny URL ${HOST}${action.payload} removed`);
			}
		});
	},
	reducers: {}
});

export default tinyUrlSlice.reducer;