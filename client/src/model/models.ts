export class UrlEntry {
	originalUrl: string = "";
	shortUrl: string = "";
	visited: number = 0;
}

export class UrlListing {
	Entries: UrlEntry[] = [];
	CurrentIndex: number = 0;
	TotalCount: number = 0;
}

export interface RootState {
	contacts: UrlEntry[];
}