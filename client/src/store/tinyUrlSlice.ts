import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks/hooks";
import { UrlEntry, UrlListing } from "../model/models";

export const tinyUrlSlice = createSlice({
	name: 'tinyUrl',
	initialState: {
		Entries: [] as UrlEntry[],
		CurrentIndex: 0,
		TotalCount: 0
	},
	reducers: {
		load: (state, action: PayloadAction<{ startIndex: number, pageSize: number, filter: string }>) => {
			//issue server request to get the list of urls
			fetch(`/TinyURL/list?startIndex=${action.payload.startIndex}&pageSize=${action.payload.pageSize}&filter=${action.payload.filter}`,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				})
				.then((response) => response.json())
				.then((data: UrlListing) => {
					state.Entries = data.Entries;
					state.CurrentIndex = data.StartIndex;
					state.TotalCount = data.TotalCount;
				})
				.catch((error) => alert(`Error loading URL list: ${error.toString()}`));
		},
		add: (state, action: PayloadAction<{ url: string, customUrl: string }>) => {
			//issue server request to add the url
			fetch(`/TinyURL/add`,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: JSON.stringify(action.payload)
				})
				.then((response) => response.json())
				.then((data: string) => {
					if (data) {
						//directly add to the first item, no server reload
						state.Entries.unshift({
							OriginalUrl: action.payload.url,
							ShortUrl: data,
							Visited: 0
						});
						alert(`Tiny URL ${data} added for: ${action.payload.url}`);
					}
				})
				.catch((error) => alert(`Error adding URL: ${error.message}`));
		},
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
						dispatch(loadUrlListing({ startIndex: 0, pageSize: 25, filter: '' }));
						alert(`Tiny URL ${action.payload} removed`);
					}
				})
				.catch((error) => alert(`Error removing URL: ${error.message}`));
		}
	}
});

export const { add: addUrl, remove: removeUrl, load: loadUrlListing } = tinyUrlSlice.actions;
export default tinyUrlSlice.reducer;