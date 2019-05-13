import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  nameLabel = 'Dive Bar Trivia';
  homeLabel = 'Home';
  aboutLabel = 'About';
  newGameLabel = 'Start New Game';
  constructor() { }

  ngOnInit() {
  }
}
