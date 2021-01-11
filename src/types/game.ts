export type Platform = {
	id: any;
	name: string;
	abbreviation: string;
};

export type Game = {
	id: any;
	name: string;
	cover?: string;
	genres: {
		id: any;
		name: string;
	};
	platforms: Platform[];
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
	platforms: Platform[];
};
