import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title = '';
  public data:any=[]
  public todo: Todos;
  public notification: Notification;
  public result: JSON;
  public token: Token;
  public tokenValue: string;

  //public model: Todo;
  public baseUrl: string;

  constructor(private router:Router, private route: ActivatedRoute, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) { 
    this.baseUrl = environment.APIBaseURL;

    this.todo = JSON.parse('{"title":"","isDone":false}') as Todos;
    this.notification = JSON.parse('{"message":"d", "error":"false"}') as Notification;
    
    // try getting Json from API to check if user is authorised
    http.get(this.baseUrl + 'api/todos', {
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
      this.todo = result as Todos;
    }, error => 
    {
      console.log(error);
      if(error.status == "401") // Unauthorized
      {
        this.notification = JSON.parse('{"message":"Bummer! You are not authorized. Redirecting you to the login page...", "error":"true"}') as Notification;

        setTimeout(() => 
        {
          this.router.navigate(["/login"]);
        },
        5000);
      }
     
    }
    );

  }

  ngOnInit() {
  }

  
  getFromSession(key): Token {
    this.data[key]= this.storage.get(key);

    return this.data;
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 

    // get session token
    this.token = this.getFromSession("token") as Token;
    this.tokenValue = "Bearer " + this.token["token"];

    // put request to api
    this.http
    .post(this.baseUrl + 'api/todos', this.todo, 
    {
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    })
    .subscribe(result => {
      this.todo = result as Todos;
    }, 
    // An error has occurred; check status code and take according action
    error => 
    {
      console.log(error);
      if(error.status == 400) // Unauthorized
      {
        this.notification = JSON.parse('{"message":"Bummer! You are not authorized. Redirecting you to the login page...", "error":"true"}') as Notification;
      }
      setTimeout(() => 
      {
        this.router.navigate(["/login"]);
      },
      5000);
    });

    this.router.navigate(["/todos/list"]);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.notification); }
}

interface Todos {
  title: string;
  isDone: boolean;
}

interface Token {
  code: string;
}

interface Notification {
  message: string;
  error: boolean;
}