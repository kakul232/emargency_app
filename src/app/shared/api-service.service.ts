import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './model/contact';
import { Alert } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl:string = environment.apiurl;
  
  constructor(private http: HttpClient) { }

  getContact(){
    return this.http.get(this.apiUrl+'/contact');
  }

  putContact(value){
    return this.http.post(this.apiUrl+'/contact',value);
  }
  DeleteContact(index){
    console.log(index);
    return this.http.delete(this.apiUrl+`/contact/${index}`);
  }

  // Send Sms Or Call 

  itsEmargency(){
    return this.http.get(this.apiUrl+'/contact').subscribe((res)=>{
      res.forEach(element => {
        // Call SMS API 
        alert('SMS SENT TO '+element.phone);
      });
    })
  }
}
