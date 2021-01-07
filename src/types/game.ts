export type Game = {
	id: any;
	name: string;
	cover?: string;
	genres: {
		id: any;
		name: string;
	};
	platforms: {
		id: any;
		name: string;
		abbreviation: string;
	};
};

export type APIGame = {
	id: any;
	name: string;
	cover?: {
		url: string;
	};
	genres: {
		id: any;
		name: string;
	};
	platforms: {
		id: any;
		name: string;
		abbreviation: string;
	};
};
