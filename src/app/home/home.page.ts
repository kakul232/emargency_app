import { Component } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {

  constructor(private api: ApiServiceService){}

  ItsEmargengy(){
    this.api.itsEmargency();

  }

}
