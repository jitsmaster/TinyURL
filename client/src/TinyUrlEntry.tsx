import { useAppDispatch } from './hooks/hooks';
import { UrlEntry } from './model/models';
import { removeUrl } from './store/tinyUrlSlice';


function TinyUrlEntry({ urlEntry: urlEntry }: { urlEntry: UrlEntry }) {
	const dispatch = useAppDispatch()
	const handleDeleteUrl = (id: string) => {
		dispatch(removeUrl(id))
	}
	return (
		<li key={urlEntry.ShortUrl}>
			<div>Short URL: {urlEntry.ShortUrl}</div>
			<div>Original URL: {urlEntry.OriginalUrl}</div>
			<div>Visited: {urlEntry.Visited} times</div>
			<button onClick={() => handleDeleteUrl(urlEntry.ShortUrl)}>
				Delete
			</button>
		</li>
	);
};

export default TinyUrlEntry;