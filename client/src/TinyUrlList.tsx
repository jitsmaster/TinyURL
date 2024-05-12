import TinyUrlEntry from "./TinyUrlEntry.tsx";
import { useAppSelector } from "./hooks/hooks.ts";
import { UrlEntry } from "./model/models.ts";

function TinyUrlList() {
	const contacts = useAppSelector(state => state.contacts.Entries)
	return (
		<ul>
			{contacts.map((url: UrlEntry) => (
				<TinyUrlEntry key={url.ShortUrl} urlEntry={url} />
			))}
		</ul>
	);
}

export default TinyUrlList;