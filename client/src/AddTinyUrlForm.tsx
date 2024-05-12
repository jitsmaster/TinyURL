import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUrl } from "./store/tinyUrlSlice";

function AddTinyUrlForm() {
	const [url, setName] = useState("");
	const [customUrl, setCustomUrl] = useState("");
	const dispatch = useDispatch();

	const handleAddContact = () => {
		dispatch(addUrl({
			url: url,
			customUrl: customUrl
		}))
		setName('')
		setCustomUrl('')
	};

	return (
		<div className="form">
			<div className="form-container">
				<div className="input-group">
					<label>URL:</label>
					<input
						required
						type="text"
						value={url}
						onChange={(e) => setName(e.target.value)
						}
					/>
				</div>
				<div className="input-group">
					<label>Custom URL (path only, optional):</label>
					<input
						type="text"
						value={customUrl}
						onChange={(e) => setCustomUrl(e.target.value)}
					/>
				</div>
			</div>
			<button onClick={handleAddContact} > Add Tiny URL </button>
		</div>
	);
}

export default AddTinyUrlForm;