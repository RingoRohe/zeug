import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zeug';

  constructor(private user: UserService) {

  }

  ngOnInit() {
    // this.user.createUser('ringo.rohe@gmail.com', 'Rr17Zg83', 'Ringo');
    // this.user.createUser('ringo.rohe+spam@gmail.com', 'Rr17Zg83', 'Ringo (spam)');
    // this.user.login('hallo@ringorohe.de', 'Rr17Zg83');
    // this.user.logout();
    this.user.getCurrentUser();
    // this.user.sendVerification();
  }
}
