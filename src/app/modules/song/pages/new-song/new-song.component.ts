import { Component, OnInit } from "@angular/core";
import { Song, Author } from 'src/app/shared';
import { Observable } from 'rxjs';

@Component({
  selector: "app-new-song",
  templateUrl: "./new-song.component.html",
  styleUrls: ["./new-song.component.css"]
})
export class NewSongComponent implements OnInit {

	song = new Song()
	authots$: Observable<Author[]>
	constructor() {}

	ngOnInit() {}
}
