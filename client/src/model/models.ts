export class UrlEntry {
	OriginalUrl: string = "";
	ShortUrl: string = "";
	Visited: number = 0;
}

export class UrlListing {
	Entries: UrlEntry[] = [];
	StartIndex: number = 0;
	NextIndex: number = 0;
	TotalCount: number = 0;
}

export interface RootState {
	contacts: UrlEntry[];
}