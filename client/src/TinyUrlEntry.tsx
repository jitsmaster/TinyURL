import { useAppDispatch } from './hooks/hooks';
import { UrlEntry } from './model/models';
import { HOST, removeThunk } from './store/tinyUrlSlice';


function TinyUrlEntry({ urlEntry: urlEntry }: { urlEntry: UrlEntry }) {
	const dispatch = useAppDispatch();
	const handleDeleteUrl = (shortUrl: string) => {
		dispatch(removeThunk(shortUrl))
	};

	return (
		<li key={urlEntry.shortUrl}>
			<div className="short-url">Short URL: {`${HOST}${urlEntry.shortUrl}`}</div>
			<div className="long-url">Original URL: {urlEntry.originalUrl}</div>
			<div className="visited">Visited: {urlEntry.visited} times</div>
			<button onClick={() => handleDeleteUrl(urlEntry.shortUrl)}>
				Delete
			</button>
		</li>
	);
};

export default TinyUrlEntry;