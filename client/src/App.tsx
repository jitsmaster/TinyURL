
import AddTinyUrlForm from './AddTinyUrlForm';
import './App.css';
import TinyUrlList from './TinyUrlList';
import { useAppDispatch } from './hooks/hooks';
import { loadUrlListing } from './store/tinyUrlSlice';


function App() {
	//issue loading
	const dispatch = useAppDispatch();
	dispatch(loadUrlListing({ startIndex: 0, pageSize: 25, filter: '' }));

	return (
		<div className="App">
			<h1>Contact List</h1>
			<AddTinyUrlForm />
			<TinyUrlList />
		</div>
	)
}

export default App