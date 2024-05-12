import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { PAGE_SIZE } from "./store/store";
import { loadUrlListing } from "./store/tinyUrlSlice";

export function Paginator() {
	const currentStartIndex = useAppSelector(state => state.urlEntries.CurrentIndex);
	const totalCount = useAppSelector(state => state.urlEntries.TotalCount);
	const canNext = currentStartIndex < totalCount - 1;
	const canPrev = currentStartIndex > 0;

	const dispatch = useAppDispatch();

	const handlePageChange = (offset: number) => {
		dispatch(loadUrlListing({ startIndex: currentStartIndex + offset * PAGE_SIZE, pageSize: PAGE_SIZE, filter: '' }));
	};

	return (
		<div className="paginator">
			<button disabled={!canPrev} onClick={() => handlePageChange(-1)}>&lt;</button>
			<div>{currentStartIndex} of {totalCount}</div>
			<button disabled={!canNext} onClick={() => handlePageChange(1)}>&gt;</button>
		</div>
	);
}