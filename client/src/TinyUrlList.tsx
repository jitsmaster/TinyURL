import { useState } from "react";
import { Paginator } from "./Paginator.tsx";
import TinyUrlEntry from "./TinyUrlEntry.tsx";
import { useAppDispatch, useAppSelector } from "./hooks/hooks.ts";
import { UrlEntry } from "./model/models.ts";
import { PAGE_SIZE } from "./store/store.ts";
import { loadThunk } from "./store/tinyUrlSlice.ts";

function TinyUrlList() {
	const contacts = useAppSelector(state => state.urlEntries.entries)
	const dispatch = useAppDispatch();

	const [filterVal, setFilterVal] = useState('');

	const filter = () => {
		dispatch(loadThunk({ startIndex: 0, pageSize: PAGE_SIZE, filter: filterVal }));
	};

	const clear = () => {
		setFilterVal('');
		dispatch(loadThunk({ startIndex: 0, pageSize: PAGE_SIZE, filter: '' }));
	}


	return (
		<div className="tiny-url-list">
			<div className="filter-container">
				<input
					type="text" placeholder="Filter"
					value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
				<button onClick={filter}>Filter</button>
				{!!filterVal &&
					<button onClick={clear} >Clear</button>
				}
			</div>
			<Paginator />
			<ul>
				{contacts.map((url: UrlEntry) => (
					<TinyUrlEntry key={url.shortUrl} urlEntry={url} />
				))}
			</ul>
			<Paginator />
		</div>
	);
}

export default TinyUrlList;