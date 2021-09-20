import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faHandshake, faShieldAlt, faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  faTruck = faTruck;
  faCheckCircle = faCheckCircle;
  faShield = faShieldAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
