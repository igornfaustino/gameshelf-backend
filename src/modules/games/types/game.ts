export type Platform = {
	id: any;
	name: string;
	abbreviation: string | null;
};

export type Genre = {
	id: any;
	name: string;
};

export type Game = {
	id: number;
	name: string;
	cover: string | null;
	thumbnail: string | null;
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
