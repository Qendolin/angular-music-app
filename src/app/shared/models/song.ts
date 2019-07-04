import { Author } from './author';

export class Song {
	name: string;
	url: string;
	length: number;
	author = new Author();
}