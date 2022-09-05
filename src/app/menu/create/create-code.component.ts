import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html',
  styleUrls: ['./create-code.component.css'],
})
export class CreateCodeComponent implements OnInit {
  constructor(private backend: BackendService) {}

  ngOnInit() {}
}
