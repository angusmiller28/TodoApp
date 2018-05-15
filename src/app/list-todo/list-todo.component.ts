import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {
  public data:any=[]
  public todos: Todos[];
  public todo: Todos;
  public notification: Notification;
  public token: Token;
  public tokenValue: string;
  public baseUrl: string;
  
  constructor(private router:Router, private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    this.baseUrl = environment.APIBaseURL;

     // get session token
     this.token = this.getFromSession("token") as Token;
     this.tokenValue = "Bearer " + this.token["token"];
     this.notification = JSON.parse('{"message":"d", "error":"false"}') as Notification;

    http.get(this.baseUrl + 'api/todos', {
      headers: new HttpHeaders().set('Authorization', this.tokenValue), 
    }).subscribe(result => {
      this.todos = result as Todos[];

      this.todos.forEach(element => {
        element.subtaskCurrent = 5;
        element.subtaskTotal = 10;
      });
      
      // calculate complete percentage
      this.calculateTodosPercentage(this.todos);

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

  submitted = false;
  
  getFromSession(key): Token {
    this.data[key]= this.storage.get(key);

    return this.data;
}

calculateTodosPercentage(Todos)
{
  // loop through todos and assign percentage
  Todos.forEach(element => {
    element.completedPercentageText = '' + (element.subtaskCurrent / element.subtaskTotal) * 100 + '%';
    element.completedPercentage = (element.subtaskCurrent / element.subtaskTotal) * 100;
  });

  for(let key in Todos)
  {
    let value = Todos[key];

    console.log(value);
  }

}

}

interface Todos {
  id: number;
  title: string;
  isDone: boolean;
  completedPercentage: string;
  subtaskCurrent: number;
  subtaskTotal: number;
}

interface Token {
  code: string;
}

interface Notification {
  message: string;
  error: boolean;
}