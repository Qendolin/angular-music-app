import { Genre } from './genre';
import { Playlist } from './playlist';

export interface Song {
	id: number;
	name: string;
	url: string;
	length: number;
	author: string;
	genres: Genre[];
	public: boolean;
	playlists: Playlist[];
}
