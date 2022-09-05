import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
  constructor(private backend: BackendService) {}

  ngOnInit() {}

  async onData(data: any) {
    console.log(data);

    // TODO
  }

  onError(e: any) {
    alert('Es gab einen Fehler: ' + JSON.stringify(e));
  }
}
