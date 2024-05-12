
import AddTinyUrlForm from './AddTinyUrlForm';
import './App.css';
import TinyUrlList from './TinyUrlList';
import { useAppDispatch } from './hooks/hooks';
import { PAGE_SIZE } from './store/store';
import { loadUrlListing } from './store/tinyUrlSlice';

//note: for product code, page size will be determined by a ResizeObserver, based on the size of the listing container
function App() {
	//issue loading
	const dispatch = useAppDispatch();
	dispatch(loadUrlListing({ startIndex: 0, pageSize: PAGE_SIZE, filter: '' }));

	return (
		<div className="App">
			<h1>Contact List</h1>
			<AddTinyUrlForm />
			<hr />
			<TinyUrlList />
		</div>
	)
}

export default App