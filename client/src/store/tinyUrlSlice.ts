import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks/hooks";
import { UrlEntry } from "../model/models";

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

			return resp.json();
		} catch (error: any) {
			alert(`Error adding URL: ${error.message}`);
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
					shortUrl: action.payload.shortUrl,
					visited: 0
				});
				alert(`Tiny URL ${action.payload.shortUrl} added for: ${action.payload.url}`);
			}
		});
	},
	reducers: {
		remove: (_, action: PayloadAction<string>) => {
			//issue server request to delete the url
			fetch(`/TinyURL/remove?shortUrl=${action.payload}`,
				{
					method: 'DELETE'
				})
				.then((response) => response.json())
				.then((data: boolean) => {
					if (data) {
						//if removed, trigger reload of list
						const dispatch = useAppDispatch();
						dispatch(loadThunk({ startIndex: 0, pageSize: 25, filter: '' }));
						alert(`Tiny URL ${action.payload} removed`);
					}
				})
				.catch((error) => alert(`Error removing URL: ${error.message}`));
		}
	}
});

export const { remove: removeUrl } = tinyUrlSlice.actions;
export default tinyUrlSlice.reducer;