export type Platform = {
	id: any;
	name: string;
	abbreviation: string;
};

export type Genre = {
	id: any;
	name: string;
};

export type Game = {
	id: any;
	name: string;
	cover?: string;
	thumbnail?: string;
	genres: Genre[];
	platforms: Platform[];
};

export type APIGame = {
	id: any;
	name: string;
	cover?: {
		url: string;
	};
	genres: Genre[];
	platforms: Platform[];
};
