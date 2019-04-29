import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiServiceService } from '../shared/api-service.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  contactForm :any;
  contacts;


  constructor(private formBuilder : FormBuilder , private api: ApiServiceService) { 

    this.contactForm = this.formBuilder.group({
      name : ['', Validators.required],
      phone : ['', [Validators.required]],
   });

  }

  AddContact(name, phone){
    if (this.contactForm.dirty && this.contactForm.valid) {
      this.api.putContact(this.contactForm.value).subscribe((res)=>{
        this.getContact();
      });
    }
  }

  getContact(){
    this.api.getContact().subscribe((res)=>{
      this.contacts= res;
    });
  
  }
  deleteContact(index){
    this.api.DeleteContact(index).subscribe((res)=>{
      this.getContact();
    });
  }

  ngOnInit() {
   this.getContact();
  }

}
