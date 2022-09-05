import { Component, OnInit } from '@angular/core';
import { BackendService, HighScoreEntry } from '../../backend.service';

@Component({
  selector: 'app-scores-display',
  templateUrl: './scores-display.component.html',
  styleUrls: ['./scores-display.component.css'],
})
export class ScoresDisplayComponent implements OnInit {
  public scores: HighScoreEntry[] = [];
  constructor(private backend: BackendService) {}

  async ngOnInit() {
    this.scores = await this.backend.getHighscores();
  }
}
