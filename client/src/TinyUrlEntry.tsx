import { useAppDispatch } from './hooks/hooks';
import { UrlEntry } from './model/models';
import { removeUrl } from './store/tinyUrlSlice';


function TinyUrlEntry({ urlEntry: urlEntry }: { urlEntry: UrlEntry }) {
	const dispatch = useAppDispatch()
	const handleDeleteUrl = (id: string) => {
		dispatch(removeUrl(id))
	}
	return (
		<li key={urlEntry.shortUrl}>
			<div className="short-url">Short URL: {urlEntry.shortUrl}</div>
			<div className="long-url">Original URL: {urlEntry.originalUrl}</div>
			<div>Visited: {urlEntry.visited} times</div>
			<button onClick={() => handleDeleteUrl(urlEntry.shortUrl)}>
				Delete
			</button>
		</li>
	);
};

export default TinyUrlEntry;