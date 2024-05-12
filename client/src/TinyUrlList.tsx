import { Paginator } from "./Paginator.tsx";
import TinyUrlEntry from "./TinyUrlEntry.tsx";
import { useAppSelector } from "./hooks/hooks.ts";
import { UrlEntry } from "./model/models.ts";

function TinyUrlList() {
	const contacts = useAppSelector(state => state.urlEntries.Entries)
	return (
		<div className="tiny-url-list">
			<div className="filter-container">
				<input type="text" placeholder="Filter" />
				<button>Filter</button>
			</div>
			<Paginator />
			<ul>
				{contacts.map((url: UrlEntry) => (
					<TinyUrlEntry key={url.ShortUrl} urlEntry={url} />
				))}
			</ul>
			<Paginator />
		</div>
	);
}

export default TinyUrlList;