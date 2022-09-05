import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pct-login',
  templateUrl: './pct-login.component.html',
  styleUrls: ['./pct-login.component.css'],
})
export class PctLoginComponent implements OnInit {
  userName = '';
  constructor(private router: Router) {}

  ngOnInit() {
    // TODO check if there is a current user
    // if yes, navigate to the main menu
  }

  loginHandler() {
    // TODO
    // 1. set the userName as the current username in localStorage
    // 2. call this.navigateToMainMenu() to leave the login page
    // 3. if userName is an empty string show an alert("Your message")
  }

  navigateToMainMenu() {
    this.router.navigate(['/']);
  }
}
