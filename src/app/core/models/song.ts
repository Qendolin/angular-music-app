import { Genre } from './genre';

export interface Song {
	id: number;
	name: string;
	url: string;
	length: number;
	author: string;
	genres: Genre[];
	public: boolean;
}
