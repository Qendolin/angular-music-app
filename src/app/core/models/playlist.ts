import { Song } from '.';

export interface Playlist {
	id: number;
	name: string;
	songs: Song[];
}
