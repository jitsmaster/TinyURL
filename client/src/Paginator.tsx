import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { PAGE_SIZE } from "./store/store";
import { loadThunk } from "./store/tinyUrlSlice";

export function Paginator() {
	const currentStartIndex = useAppSelector(state => state.urlEntries.currentIndex);
	const totalCount = useAppSelector(state => state.urlEntries.totalCount);
	const curPage = Math.floor(currentStartIndex / PAGE_SIZE) + 1;
	const totalPages = Math.ceil(totalCount / PAGE_SIZE);
	const canNext = curPage < totalPages;
	const canPrev = curPage > 1;

	const dispatch = useAppDispatch();

	const handlePageChange = (offset: number) => {
		dispatch(loadThunk({ startIndex: currentStartIndex + offset * PAGE_SIZE, pageSize: PAGE_SIZE, filter: '' }));
	};

	return (
		<div className="paginator">
			<button disabled={!canPrev} onClick={() => handlePageChange(-1)}>&lt;</button>
			<div>Page {curPage} of {totalPages}</div>
			<button disabled={!canNext} onClick={() => handlePageChange(1)}>&gt;</button>
		</div>
	);
}