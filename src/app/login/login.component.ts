import { Component, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Data } from '../data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = '';
  public user: User;
  public token: Token;
  public notification: Notification;
  public authHeader: string;

  //public model: Todo;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
    this.baseUrl = environment.APIBaseURL;
    
    this.notification = JSON.parse('{"message":"d", "error":"false"}') as Notification;
    this.user = JSON.parse('{"username":"","password":""}') as User;
    
    console.log(this.user);
  }

  ngOnInit() {
    
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 

    // create auth header
    this.authHeader = btoa(this.user.username + ":" + this.user.password);

    // put request to api
    this.http
    .post(this.baseUrl + 'api/auth/token', this.user, 
    {
      headers: new HttpHeaders().set('Authorization', 'Basic ' + this.authHeader), 
    })
    .subscribe(result => {
      this.token = result as Token;

      // save to session
      this.saveInSession("token",this.token.code)

      this.router.navigate(["/todos/list"]);
    }, 
    // An error has occurred; check status code and take according action
    error => 
    {
      console.log(error);
      if(error.status == 400) // Unauthorized
      {
        this.notification = JSON.parse('{"message":"Bummer! We could not verify you. Did you give the right credentials?", "error":"true"}') as Notification;
      }
      this.router.navigate(["/login"]);
    }
    );

      

      //this.router.navigate(["/todos/list"]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.notification); }

  saveInSession(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);

}

}


interface User {
  username: string;
  password: string;
}

interface Token {
  code: string;
}

interface Notification {
  message: string;
  error: boolean;
}
